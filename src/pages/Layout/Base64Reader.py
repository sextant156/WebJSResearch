# 打开C:\Users\NUC\Desktop\base64.txt
list = []
with open(r'C:\Users\NUC\Desktop\base64.txt', 'r') as f:
    for line in f:
        list.append(line.strip('\n'))
print(list[0][1])
