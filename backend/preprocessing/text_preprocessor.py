import re
from typing import List, Dict, Tuple, Any

# Sentiment-preserving preprocessing pipeline for Attention-Based Text Classification
STOPWORDS_TO_KEEP = {"not", "no", "never", "bad", "good", "great", "hardly", "barely", "least", "best", "worst", "amazing", "terrible", "boring", "awful", "excellent"}

DEFAULT_STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at",
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could",
    "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for",
    "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's",
    "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm",
    "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't",
    "my", "myself", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
    "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such",
    "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these",
    "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until",
    "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren me", "weren't", "what",
    "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with",
    "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
} - STOPWORDS_TO_KEEP

class TextPreprocessor:
    """
    NLP Text Preprocessing Pipeline:
    Raw Text -> Lowercase -> Clean Punctuation -> Tokenization -> Stopword Filter (sentiment preserved) -> Vocab Lookup -> Padding/Truncation
    """
    def __init__(self, max_seq_len: int = 100, vocab_size: int = 10000):
        self.max_seq_len = max_seq_len
        self.vocab_size = vocab_size
        self.word2idx: Dict[str, int] = {"<PAD>": 0, "<UNK>": 1}
        self.idx2word: Dict[int, str] = {0: "<PAD>", 1: "<UNK>"}
        
    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        # Lowercase
        text = text.lower()
        # HTML tag removal
        text = re.sub(r'<[^>]+>', ' ', text)
        # Remove special characters except letters and spaces
        text = re.sub(r'[^a-z0-9\s\']', ' ', text)
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def tokenize(self, cleaned_text: str) -> List[str]:
        if not cleaned_text:
            return []
        tokens = cleaned_text.split()
        return tokens

    def filter_tokens(self, tokens: List[str]) -> List[str]:
        # Filter standard stopwords but maintain critical sentiment words
        return [t for t in tokens if t not in DEFAULT_STOPWORDS or t in STOPWORDS_TO_KEEP]

    def build_vocab(self, texts: List[str]):
        word_counts: Dict[str, int] = {}
        for text in texts:
            cleaned = self.clean_text(text)
            tokens = self.tokenize(cleaned)
            for token in tokens:
                word_counts[token] = word_counts.get(token, 0) + 1
        
        # Sort by frequency
        sorted_words = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)
        for word, _ in sorted_words[: self.vocab_size - 2]:
            if word not in self.word2idx:
                idx = len(self.word2idx)
                self.word2idx[word] = idx
                self.idx2word[idx] = word

    def text_to_sequence(self, tokens: List[str]) -> List[int]:
        return [self.word2idx.get(t, 1) for t in tokens]

    def pad_sequence(self, seq: List[int]) -> List[int]:
        if len(seq) >= self.max_seq_len:
            return seq[:self.max_seq_len]
        return seq + [0] * (self.max_seq_len - len(seq))

    def process(self, raw_text: str) -> Dict[str, Any]:
        cleaned = self.clean_text(raw_text)
        tokens = self.tokenize(cleaned)
        filtered = self.filter_tokens(tokens)
        seq = self.text_to_sequence(tokens if tokens else ["<empty>"])
        padded = self.pad_sequence(seq)
        
        return {
            "original_text": raw_text,
            "cleaned_text": cleaned,
            "tokens": tokens,
            "filtered_tokens": filtered,
            "sequence": seq,
            "padded_sequence": padded,
            "sequence_length": len(tokens)
        }
