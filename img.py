from traceback import print_tb
from bs4 import BeautifulSoup
import os.path
import re
import wget
 
if os.path.exists('./1.html'):
  file = open('./1.html', 'r')
  html = file.read()

  soup = BeautifulSoup(html, 'html.parser')
  css = soup.find('link', {"id": "kitContentCss"})['href']
  cssFile = open('./'+css, 'r')
  cssFile = cssFile.read()

  res = cssFile

  res = re.findall("url\(\'https://opiqredaktoratamura.blob.core.windows.net/kitcontent/..................................................................................................................", cssFile)

  for i in res:
    i = i[5:]

    if i != '':
      name = i[135:]
    else:
      continue

    if name[len(name)-1] == 'e':
      name = name[:-1]+'g'

    if i[len(i)-1] == 'e':
      i = i[:-1]+'g'

    try:
      wget.download(i)
    except:    
      continue

    res = re.sub('https://opiqredaktoratamura.blob.core.windows.net/kitcontent/...................................................................................................................', '../'+name, cssFile)


cssName = css
os.remove(css)

next = open(cssName, 'w+')
next.write(res)
next.close()