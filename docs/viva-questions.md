# Viva Preparation: 30 Questions and Answers

## Question 1: What is attention?
Attention is a mechanism that allows a deep learning model to focus on specific, highly relevant parts of an input sequence when making predictions.

## Question 2: Why is attention needed for text classification?
Traditional RNNs and LSTMs compress variable-length text into a single static final vector, creating an information bottleneck. Attention dynamically weights all sequence token states.

## Question 3: What is Query, Key, and Value?
- **Query (Q):** What information the target state is seeking.
- **Key (K):** Features advertised by each sequence token.
- **Value (V):** Content payload extracted to build the context vector.
