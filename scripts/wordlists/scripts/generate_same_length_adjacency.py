import json

def run():
    print("Same Length Adjacency")
    adjacency_list = {}
    for length in range(4,11):
        with open(f"ngrams/{length}.txt", "r") as file:
            all_words = [word.strip() for word in file.readlines()]
            all_words_map = {k: True for k in all_words}

        for word in all_words:
            adjacency_list[word] = []
            for i in range(length):
                for j in range(26):
                    new_letter = chr(ord('a') + j)
                    new_word = word[:i] + new_letter + word[i+1:]
                    if new_word in all_words_map and new_word != word:
                        adjacency_list[word].append(new_word)

    with open("adjacency/same_length.json", "w") as file:
        json.dump(adjacency_list, file)

if __name__ == "__main__":
    run()