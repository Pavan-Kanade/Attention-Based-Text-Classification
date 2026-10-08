import os
import urllib.request
import tarfile
import pandas as pd

def download_and_extract_imdb():
    url = "https://ai.stanford.edu/~amaas/data/sentiment/aclImdb_v1.tar.gz"
    dataset_dir = os.path.dirname(os.path.abspath(__file__))
    tar_path = os.path.join(dataset_dir, "aclImdb_v1.tar.gz")
    
    print(f"Downloading IMDb dataset from {url}...")
    urllib.request.urlretrieve(url, tar_path)
    print("Extracting dataset archive...")
    with tarfile.open(tar_path, "r:gz") as tar:
        tar.extractall(path=dataset_dir)
        
    print("Dataset successfully extracted to dataset/aclImdb")

if __name__ == "__main__":
    download_and_extract_imdb()
