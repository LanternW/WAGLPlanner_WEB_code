FROM python:3.8-bullseye
LABEL maintainer="SalimTerryLi <lhf2613@gmail.com>"

RUN pip install flask xlrd xlwt xlutils

COPY . /root/wagp

ENTRYPOINT ["/root/wagp/entrypoint.sh"]
CMD ["/bin/bash"]
