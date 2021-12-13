from wtforms import Form
from wtforms.fields import simple
from wtforms import validators

class AddLdmkForm(Form):

    name    = simple.TextField(
        "地标名称" , validators=[
            validators.DataRequired(message="名称不能为空")
        ])

    cor_x   = simple.StringField(
        "x坐标", validators=[
            validators.DataRequired(message="请填写x坐标")
        ])
    
    cor_z   = simple.StringField(
        "z坐标", validators=[
            validators.DataRequired(message="请填写z坐标")
        ])
    
    product = simple.TextField("产品")
    description = simple.TextField("介绍")

    dor    = simple.BooleanField("是否包含地狱门")

    submit  = simple.SubmitField("提交")