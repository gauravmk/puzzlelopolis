import json
import sys
from collections import deque

OMIT_WORDS=["deaf", "dead", "hell", "pell"]

start_word = sys.argv[1]
end_word = sys.argv[2]

def run():
    with open("adjacency/same_length.json", "r") as file:
        graph = json.load(file)

    visited = {}  # Use a dict so you can store where the visit came from
    queue = deque()    # Use a deque to not lose efficiency with pop(0)

    visited[start_word] = None
    queue.append(start_word)
    
    while queue:
        m = queue.popleft() 
        if m == end_word:  # Bingo!
            # Extract path from visited information
            path = []
            while m:
                path.append(m)
                m = visited[m]  # Walk back
            return path[::-1]  # Reverse it
        for neighbor in graph[m]:
            if neighbor not in visited and neighbor not in OMIT_WORDS:
                visited[neighbor] = m  # Remember where we came from
                queue.append(neighbor)




if __name__ == "__main__":
    print(run())
