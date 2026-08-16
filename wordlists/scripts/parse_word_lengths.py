gram_files = {}
for i in range(4, 11):
    gram_files[i] = open(f'ngrams/{i}_tmp.txt', 'w')

with open('raw/google_common_words.txt') as filehandle:
    for row in filehandle:
        word_length = len(row) - 1
        if word_length in gram_files:
            gram_files[word_length].write(row)

with open('raw/spreadthewordlist.txt') as filehandle:
    for row in filehandle:
        [normalized_word, score] = row.strip().lower().split(";")
        if score != '50':
            continue
        word_length = len(normalized_word)
        if len(normalized_word) in gram_files:
            gram_files[word_length].write(f"{normalized_word}\n")

