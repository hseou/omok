import random

def make_ai_move(board):
    # 간단한 랜덤 룰을 사용한 예제
    empty_cells = [(i, j) for i in range(len(board))
                   for j in range(len(board[0]))
                   if board[i][j] == ""]
    return random.choice(empty_cells) if empty_cells else None
