import json

def sort_word(w): 
    return ''.join(sorted(w))

all_words_map = {}

def run():
    print("Anigram Adjacency")

    for length in range(4,11):
        with open(f"ngrams/{length}.txt", "r") as file:
            for word_ in file.readlines():
                word = word_.strip()
                sorted_word = sort_word(word)
                if sorted_word not in all_words_map:
                    all_words_map[sorted_word] = []
                all_words_map[sorted_word].append(word)


    adjacency_list = {}
    for length in range(4,11):
        print(f"processing {length}-grams")
        with open(f"ngrams/{length}.txt", "r") as file:
            words_of_length = [word.strip() for word in file.readlines()]

        for word in words_of_length:
            adjacency_list[word] = []
            sorted_word = sort_word(word)
            for i in range(26):
                new_letter = chr(ord('a') + i)
                new_sorted_word = sort_word(word + new_letter)
                if new_sorted_word in all_words_map:
                    for word_to_add in all_words_map[new_sorted_word]:
                        adjacency_list[word].append(word_to_add)

    with open("adjacency/anigram.json", "w") as file:
        json.dump(adjacency_list, file)

if __name__ == "__main__":
    run()