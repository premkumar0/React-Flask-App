from flask import Flask, jsonify
from flask_cors import CORS
from mysql.connector import connect

app = Flask(__name__)
CORS(app)

app.config["CORS_METHODS"] = ["GET", "HEAD", "OPTIONS"]
app.config["CORS_ORIGINS"] = "http://localhost:3000"


@app.route("/api/employees", methods=["GET"])
def get_employees():
    conn = connect(user="root", database="fsit_sales_database", password="root_password")
    cursor = conn.cursor()

    query = """
    SELECT e.employeeNumber, e.lastName, e.firstName, e.extension, e.email, e.officeCode, e.jobTitle, o.city, o.phone, e.reportsTo, r.lastName as reportToLastName, r.firstName as reportToFirstName
    FROM employees e
    LEFT JOIN employees r ON e.reportsTo = r.employeeNumber
    JOIN offices o ON e.officeCode = o.officeCode;
    """
    cursor.execute(query)
    employees = []
    for row in cursor:
        employees.append(
            {
                "employeeNumber": row[0],
                "lastName": row[1],
                "firstName": row[2],
                "extension": row[3],
                "email": row[4],
                "officeCode": row[5],
                "jobTitle": row[6],
                "city": row[7],
                "phone": row[8],
                "reportsTo": row[9],
                "reportToLastName": row[10],
                "reportToFirstName": row[11],
            }
        )
    cursor.close()
    conn.close()
    return jsonify({"data": employees})


if __name__ == "__main__":
    app.run(debug=True)
