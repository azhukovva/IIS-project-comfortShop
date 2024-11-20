FROM python:3.10

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip install -r requirements.txt

# COPY ./django_entrypoint.sh .
# RUN sed -i 's/\r$//g' /usr/src/app/django_entrypoint.sh
# RUN chmod +x /usr/src/app/django_entrypoint.sh

COPY . .

# ENTRYPOINT ["/app/django_entrypoint.sh"]