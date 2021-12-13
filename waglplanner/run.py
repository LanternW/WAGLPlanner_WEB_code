import xlrd
import xlwt
import os
from xlutils.copy import copy


from flask import Flask,render_template,request,jsonify,redirect, send_from_directory

import random
import math
#import AddLdmkForm

online_player = '0'


#计算四元数
def fourYuanCalc(x,y,z):

    x = x + 1.57
    f_x = math.cos(x/2)*math.cos(y/2)*math.cos(z/2) + math.sin(x/2)*math.sin(y/2)*math.sin(z/2)
    f_y = math.sin(x/2)*math.cos(y/2)*math.cos(z/2) - math.cos(x/2)*math.sin(y/2)*math.sin(z/2)
    f_z = math.cos(x/2)*math.sin(y/2)*math.cos(z/2) + math.sin(x/2)*math.cos(y/2)*math.sin(z/2)
    f_w = math.cos(x/2)*math.cos(y/2)*math.sin(z/2) - math.sin(x/2)*math.sin(y/2)*math.cos(z/2)
    return [f_x,f_y , f_z ,f_w]

def addLdmkToExcel(world,name,x,z,pro,des,dor,r,g,b): #向表格中新增一列地标

    world = int(world)
    r = math.floor(float(r))
    g = math.floor(float(g))
    b = math.floor(float(b))
    print(world,name,x,z,pro,des,dor,r,g,b)

    file="record\\landmarks.xls"

    #读取地标文档
    landmark_book = xlrd.open_workbook(file)
    landmark_book_new = copy(landmark_book)
    if world == 1:
        sheet_main = landmark_book.sheet_by_name('main')
        sheet_main_new = landmark_book_new.get_sheet(0)
        nrows = sheet_main.nrows
        last_id = int(sheet_main.cell(nrows-1,0).value) #获取最末地标id
        print(last_id)
        
        sheet_main_new.write(nrows , 0, last_id+1)
        sheet_main_new.write(nrows , 1, name)
        sheet_main_new.write(nrows , 2, x)
        sheet_main_new.write(nrows , 3, z)
        sheet_main_new.write(nrows , 4, r)
        sheet_main_new.write(nrows , 5, g)
        sheet_main_new.write(nrows , 6, b)
        sheet_main_new.write(nrows , 7, dor)
        sheet_main_new.write(nrows , 8, "none.png")
        sheet_main_new.write(nrows , 9, pro)
        sheet_main_new.write(nrows , 10, des)

        landmark_book_new.save(file)


    if world == 2:
        sheet_hell = landmark_book.sheet_by_name('hell')
        sheet_hell_new = landmark_book_new.get_sheet(1)
        nrows = sheet_hell.nrows
        last_id = int(sheet_hell.cell(nrows-1,0).value) #获取最末地标id
        print(last_id)
        
        sheet_hell_new.write(nrows , 0, last_id+1)
        sheet_hell_new.write(nrows , 1, name)
        sheet_hell_new.write(nrows , 2, x)
        sheet_hell_new.write(nrows , 3, z)
        sheet_hell_new.write(nrows , 4, r)
        sheet_hell_new.write(nrows , 5, g)
        sheet_hell_new.write(nrows , 6, b)
        sheet_hell_new.write(nrows , 7, dor)
        sheet_hell_new.write(nrows , 8, "none.png")
        sheet_hell_new.write(nrows , 9, pro)
        sheet_hell_new.write(nrows , 10, des)

        landmark_book_new.save(file)

    if world == 3:
        sheet_end = landmark_book.sheet_by_name('end')
        sheet_end_new = landmark_book_new.get_sheet(2)
        nrows = sheet_end.nrows
        last_id = int(sheet_end.cell(nrows-1,0).value) #获取最末地标id
        print(last_id)
        
        sheet_end_new.write(nrows , 0, last_id+1)
        sheet_end_new.write(nrows , 1, name)
        sheet_end_new.write(nrows , 2, x)
        sheet_end_new.write(nrows , 3, z)
        sheet_end_new.write(nrows , 4, r)
        sheet_end_new.write(nrows , 5, g)
        sheet_end_new.write(nrows , 6, b)
        sheet_end_new.write(nrows , 7, dor)
        sheet_end_new.write(nrows , 8, "none.png")
        sheet_end_new.write(nrows , 9, pro)
        sheet_end_new.write(nrows , 10, des)

        landmark_book_new.save(file)
        


def loadLDMK(sheet): #读取地标的进一步封装函数

    info_json = []
    info_ldmk = dict()

    nrows = sheet.nrows #行数

    for i in range(nrows):
        id      = int(sheet.cell(i,0).value) #获取地标id
        name    = sheet.cell(i,1).value      #获取名称
        world_x = int(sheet.cell(i,2).value) #获取x坐标
        world_z = int(sheet.cell(i,3).value) #获取z坐标
        r       = int(sheet.cell(i,4).value) #获取r
        g       = int(sheet.cell(i,5).value) #获取g
        b       = int(sheet.cell(i,6).value) #获取b
        dor     = int(sheet.cell(i,7).value) #获取"该地标是否存在地狱门"参数
        photo   = sheet.cell(i,8).value      #照片名称
        prodct  = sheet.cell(i,9).value      #产品信息
        desc    = sheet.cell(i,10).value     #描述信息
        photo   = "static\\record\\photos\\" + photo  

        info_ldmk["id"] = id
        info_ldmk["name"] = name
        info_ldmk["world_x"] = world_x
        info_ldmk["world_z"] = world_z
        info_ldmk["r"] = r
        info_ldmk["g"] = g
        info_ldmk["b"] = b
        info_ldmk["dor"] = dor
        info_ldmk["photo"] = photo
        info_ldmk["production"] = prodct
        info_ldmk["description"] = desc

        info_json.append(info_ldmk)
        info_ldmk = dict()

    return jsonify(info_json)

def loadingLdmks(selected):
    #读取地标文档
    landmark_book = xlrd.open_workbook("record\\landmarks.xls")
    if selected == 1:
        sheet_main = landmark_book.sheet_by_name('main')
        return loadLDMK(sheet_main)
    if selected == 2:
        sheet_hell = landmark_book.sheet_by_name('hell')
        return loadLDMK(sheet_hell)
    if selected == 3:
        sheet_end = landmark_book.sheet_by_name('end')
        return loadLDMK(sheet_end)

    #sheet_end = landmark_book.sheet_by_name('end')

    

app = Flask(__name__)

@app.route('/',methods=['GET','POST'])
def index():

    online_num = int(online_player)
    if request.method == 'POST':
        if request.form.get("get") == "MLDMK": #加载主世界地标请求
            return loadingLdmks(1)
        elif request.form.get("get") == "HLDMK": #加载下界地标请求
            return loadingLdmks(2)
        elif request.form.get("get") == "ELDMK": #加载末地地标请求
            return loadingLdmks(3)
        return render_template("main.html",online = online_num)

    return render_template("main.html",online = online_num)

@app.route('/rcon',methods=['GET'])
def rcon():
    rstr = "&online:" + online_player
    return rstr

@app.route('/rcon/update/<onlineNum>')
def update(onlineNum):
    global online_player
    online_player = onlineNum
    return "online player(s) set to " + online_player

@app.route('/4$number',methods=['GET','POST'])
def fourYuan():

    f_x = "null"
    f_y = "null"
    f_z = "null"
    f_w = "null"
    if request.method == 'POST':
        x = float(request.form.get("X"))
        y = float(request.form.get("Y"))
        z = float(request.form.get("Z"))
        [f_x ,f_y,f_z,f_w] = fourYuanCalc(x,y,z)
        

    return render_template("fourYuan.html",f_x = f_x , f_y = f_y , f_z = f_z , f_w = f_w)

@app.route('/ldmkadd',methods=['GET','POST'])
def addLdmk():
    if request.method == 'POST':
        world = request.form.get("world")
        name  = request.form.get("name")
        corx = request.form.get("corx")
        corz  = request.form.get("corz")
        production = request.form.get("production")
        description  = request.form.get("description")
        dor = request.form.get("dor")
        color_r  = request.form.get("color_r")
        color_g = request.form.get("color_g")
        color_b  = request.form.get("color_b")
        addLdmkToExcel(world,name,corx,corz,production,description,dor,color_r,color_g,color_b)
        return "成功添加内容"

    return "新增地标提交页面"



#以下为SRTP平台部分
def loadingDatas():

    #读取数据文档
    data_book = xlrd.open_workbook("record\\srtpDatas.xls")
    sheet_main = data_book.sheet_by_name('2021')

    info_json = []
    info_datas = dict()
    nrows = sheet_main.nrows #行数

    for i in range(1,nrows):
        id      = int(sheet_main.cell(i,0).value) #获取id
        time    = int(sheet_main.cell(i,1).value)      #获取时间
        d1      = float(sheet_main.cell(i,2).value) #获取数据1
        d2      = float(sheet_main.cell(i,3).value) #获取数据2
        d3      = float(sheet_main.cell(i,4).value) #获取数据3

        info_datas["time"] = time
        info_datas["d1"] = d1
        info_datas["d2"] = d2
        info_datas["d3"] = d3

        info_json.append(info_datas)
        info_datas = dict()

    return jsonify(info_json)

def addDataToExcel(t,d1,d2,d3):

    file="record\\srtpDatas.xls"

    #读取文档
    book = xlrd.open_workbook(file)
    book_new = copy(book)

    sheet = book.sheet_by_name('2021')
    sheet_new = book_new.get_sheet(0)
    nrows = sheet.nrows
    last_id = int(sheet.cell(nrows-1,0).value) #获取最末id
        
    sheet_new.write(nrows , 0, last_id+1)
    sheet_new.write(nrows , 1, t)
    sheet_new.write(nrows , 2, d1)
    sheet_new.write(nrows , 3, d2)
    sheet_new.write(nrows , 4, d3)
    book_new.save(file)

@app.route('/platform')
def platform():

    return render_template("platform.html")

@app.route('/platform/data',methods=['GET','POST'])
def uploadData():

    if request.method == 'POST':
        if request.form.get("todo") == "GETDATAS": #请求数据
            return loadingDatas()
        elif request.form.get("todo") == "UPLOAD": #添加数据

            print("upload")
            time = request.form.get("time")
            d1  = request.form.get("d1")
            d2 = request.form.get("d2")
            d3  = request.form.get("d3")
            addDataToExcel(time,d1,d2,d3)
            return "成功添加内容"

    return redirect(url_for('platform'))

@app.route("/platform/download")
def downloadFile():

    file = "srtpDatas.xls"
    basepath = os.path.abspath(os.getcwd())  # 当前文件所在工作目录
    print("basepath:",basepath)
    downloadpath = os.path.join(basepath, "record")
    print("downloadfiles:",downloadpath)

    print(downloadpath)
    return send_from_directory(directory=downloadpath,filename=file ,as_attachment=True)



if __name__ == "__main__":
    app.run(host='0.0.0.0' ,port=80)

