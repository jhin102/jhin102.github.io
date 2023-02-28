import os, json

POST_DIR = './blog/posts/'

def process():
    metaDatas = list()
    posts = os.listdir(POST_DIR)
    for post in posts:
        file = open(POST_DIR + post, 'r', encoding='UTF8')
        text = file.read()
        metaData = {'file':post}
        for metaLine in text[text.find('<!--') + len('<!--'):text.find('-->')].split('\n')[2:-2]:
            key, value = metaLine.split(': ')
            metaData[key] = value
        metaDatas.append(metaData)

    with open('./blog/meta.json', 'w', encoding='UTF8') as file:
        file.write(json.dumps(metaDatas, ensure_ascii=False))

if __name__ == '__main__':
    process()