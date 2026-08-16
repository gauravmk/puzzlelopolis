import json
import sys
from collections import deque


start_word = ["cats"]

banned_words = ["doncaster", "thecastro", "stopthecar", "racesto", "reactsto", "scarleta", "atscale", "cineast", "acesit", "seatac", "racist", "tosca", "costa", "casta", "escheat", "scrat", "thiscantbe", "crashdiet", "inthatcase", "thatsnice", "pinesachet", "stoical", "caresto", "scotian", "stacie"]

def run():
    with open("adjacency/anigram.json", "r") as file:
        graph = json.load(file)

    queue = deque() 
    queue.append(start_word)
   
    while queue:
        m = queue.popleft()
        if len(m[-1]) == 10:
            print_queue(queue)
            return
        for neighbor in graph[m[-1]]:
            if (neighbor[-1] != 's' and neighbor not in banned_words):
                queue.append(m + [neighbor])
        


def print_queue(q):
    with open("test.txt", "w") as fh:
        for x in q:
            fh.write(" -> ".join(x))
            fh.write("\n")


if __name__ == "__main__":
    print(run())