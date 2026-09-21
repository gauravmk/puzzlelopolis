
echo "Splitting n-grams"

rm ngrams/*
python3 scripts/parse_word_lengths.py
for i in $(seq 4 10); do cat ngrams/${i}_tmp.txt | sort | uniq > ngrams/${i}.txt; done
rm ngrams/*_tmp.txt

echo "Generating adjacency lists"

python3 scripts/generate_same_length_adjacency.py
python3 scripts/generate_anigrams_adjacency.py