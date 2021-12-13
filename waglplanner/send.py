import requests
import time

def sendDataToCloud(d1,d2,d3):

    secs = time.time()
    secs -= 1609459200
    secs += 28800 #转化为北京时间
    secs = int(secs)
    api_url = "http://376aw95341.wicp.vip/platform/data"

    json_content = {}
    json_content["todo"] = "UPLOAD"
    json_content["time"] = str(secs)
    json_content["d1"] = str(d1)
    json_content["d2"] = str(d2)
    json_content["d3"] = str(d3)

    print(json_content)
	# 开始请求
    res = requests.post(api_url, json_content)
    print(res)

if __name__ == "__main__":
    
    sendDataToCloud(0.1,0.2,0.3)
