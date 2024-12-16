'''
import requests
import pandas as pd
from urllib.parse import urlencode, quote_plus, unquote
import xml.etree.ElementTree as ET
 url = 'http://apis.data.go.kr/B551011/GoCamping/basedList'
 key = unquote('twON8Dt1DG9fuADXSLcnkMf9pp6Whk0T7xtTCqgf3pVJjXOETvY4LegblbnqpJ%2Fj0jiCyBMv2%2FAbIzVjr%2BL0IQ%3D%3D')
 params={'numOfRows':'5000', 'pageNo':'1', 'MobileOS': 'ETC', 'MobileApp':'AppTest', 'serviceKey':key}
 response = requests.get(url, params)
 xmlstring = response.content
 tree = ET.ElementTree(ET.fromstring(xmlstring))
 camping = []
 root = tree.getroot()
 for item in root.findall('./body/items/item'):
    camping0=[]
    for child in item:
        if child.tag == 'contentId':
            camping0.append(child.text)
        if child.tag == 'facltNm':
            camping0.append(child.text)
        if child.tag == 'lineIntro':
            camping0.append(child.text)
        if child.tag == 'intro':
            camping0.append(child.text)
        if child.tag == 'manageSttus':
            camping0.append(child.text)
        if child.tag == 'featureNm':
            camping0.append(child.text)
        if child.tag == 'doNm':
            camping0.append(child.text)
        if child.tag == 'sigunguNm':
            camping0.append(child.text)
        if child.tag == 'addr1':
            camping0.append(child.text)
        if child.tag == 'mapX':
            camping0.append(child.text)
        if child.tag == 'mapY':
            camping0.append(child.text)
        if child.tag == 'direction':
            camping0.append(child.text)
        if child.tag == 'tel':
            camping0.append(child.text)
        if child.tag == 'homepage':
            camping0.append(child.text)
        if child.tag == 'resveUrl':
            camping0.append(child.text)
        if child.tag == 'gnrlSiteCo':
            camping0.append(child.text)
        if child.tag == 'autoSiteCo':
            camping0.append(child.text)
        if child.tag == 'glampSiteCo':
            camping0.append(child.text)
        if child.tag == 'caravSiteCo':
            camping0.append(child.text)
        if child.tag == 'indvdlCaravSiteCo':
            camping0.append(child.text) 
        if child.tag == 'eqpmnLendCl':
            camping0.append(child.text)
        if child.tag == 'animalCmgCl':
            camping0.append(child.text)
        if child.tag == 'firstImageUrl':
            camping0.append(child.text)
        if child.tag == 'createdtime':
            camping0.append(child.text)
        if child.tag == 'modifiedtime':
camping0.append(child.text)
 camping.append(camping0)
 camping0.clear
 headers = ["contentId", "facltNm", "lineIntro", "intro", "manageSttus", "featureNm", "doNm", "sigunguNm", "addr1", "mapX", "mapY", "direction", "tel", "homepage", "resveUrl", "gnrlSiteCo", "autoSiteCo", "glampSiteCo", "caravSiteCo", "indvdlCaravSiteCo", "eqpmnLendCl", "firstImageUrl", "createdtime", "modifiedtime"]
 camping_df = pd.DataFrame(camping, columns = headers)
 camping_df.to_csv("campInfo.csv", index=False)
'''
