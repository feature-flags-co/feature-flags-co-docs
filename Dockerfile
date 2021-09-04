FROM python:3.7-slim
WORKDIR /app
COPY . /app
RUN pip install mkdocs
RUN pip install mkdocs-material
RUN pip install ffc-mkdocs-video
# RUN pip install mkdocs-bootswatch
CMD mkdocs serve -a 0.0.0.0:80