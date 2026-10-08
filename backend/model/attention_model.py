import torch
import torch.nn as nn
import torch.nn.functional as F

class AttentionLayer(nn.Module):
    """
    Bahdanau-style Additive Attention Layer for Sequence Classification
    
    Equations:
    1. Attention Score: score_i = tanh(W_h * h_i + b)
    2. Attention Weights: alpha_i = exp(score_i) / sum(exp(score_j)) = softmax(score)
    3. Context Vector: c = sum(alpha_i * h_i)
    """
    def __init__(self, hidden_dim: int):
        super(AttentionLayer, self).__init__()
        self.w_h = nn.Linear(hidden_dim, hidden_dim, bias=True)
        self.v_a = nn.Linear(hidden_dim, 1, bias=False)

    def forward(self, lstm_outputs: torch.Tensor, mask: torch.Tensor = None):
        # lstm_outputs shape: (batch_size, seq_len, hidden_dim)
        
        # 1. Project LSTM states: u_i = tanh(W_h * h_i + b)
        u_i = torch.tanh(self.w_h(lstm_outputs))  # (batch_size, seq_len, hidden_dim)
        
        # 2. Compute raw attention scores: score_i = v_a^T * u_i
        scores = self.v_a(u_i).squeeze(-1)  # (batch_size, seq_len)
        
        if mask is not None:
            # Mask out padding tokens (assign very negative score so softmax yields ~0 weight)
            scores = scores.masked_fill(mask == 0, -1e9)
            
        # 3. Softmax activation to get normalized attention weights alpha_i
        alpha = F.softmax(scores, dim=-1)  # (batch_size, seq_len)
        
        # 4. Context Vector: c = sum(alpha_i * h_i)
        # alpha.unsqueeze(-1) shape: (batch_size, seq_len, 1)
        context = torch.bmm(alpha.unsqueeze(1), lstm_outputs).squeeze(1)  # (batch_size, hidden_dim)
        
        return context, alpha

class AttentionBiLSTM(nn.Module):
    """
    Full Architecture:
    Input Sequence -> Embedding -> Bidirectional LSTM -> Attention Layer -> Context Vector -> Dense Layer -> Softmax Classification
    """
    def __init__(self, vocab_size: int, embed_dim: int = 64, hidden_dim: int = 128, num_classes: int = 2, dropout: float = 0.3):
        super(AttentionBiLSTM, self).__init__()
        self.vocab_size = vocab_size
        self.embed_dim = embed_dim
        self.hidden_dim = hidden_dim
        
        # Embedding Layer
        self.embedding = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        
        # Bidirectional LSTM Layer (outputs hidden_dim * 2)
        self.bilstm = nn.LSTM(
            input_size=embed_dim,
            hidden_size=hidden_dim,
            num_layers=1,
            batch_first=True,
            bidirectional=True
        )
        
        # Attention Layer for BiLSTM hidden state dimension (hidden_dim * 2)
        self.attention = AttentionLayer(hidden_dim * 2)
        
        # FC Classifier
        self.dropout = nn.Dropout(dropout)
        self.fc1 = nn.Linear(hidden_dim * 2, 64)
        self.relu = nn.ReLU()
        self.fc_out = nn.Linear(64, num_classes)

    def forward(self, input_ids: torch.Tensor):
        # input_ids shape: (batch_size, seq_len)
        mask = (input_ids != 0)  # Mask non-padding tokens
        
        # Embedding: (batch_size, seq_len, embed_dim)
        embedded = self.embedding(input_ids)
        
        # BiLSTM: lstm_out shape (batch_size, seq_len, hidden_dim * 2)
        lstm_out, (h_n, c_n) = self.bilstm(embedded)
        
        # Attention Layer -> Context Vector (batch_size, hidden_dim * 2) + Attention Weights (batch_size, seq_len)
        context, attention_weights = self.attention(lstm_out, mask=mask)
        
        # Dense classification head
        x = self.dropout(context)
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        logits = self.fc_out(x)
        
        # Softmax probabilities
        probabilities = F.softmax(logits, dim=-1)
        return probabilities, attention_weights
