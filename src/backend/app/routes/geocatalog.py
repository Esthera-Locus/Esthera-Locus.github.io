# routes/geocatalog.py
from flask import Blueprint, jsonify
from app.models import Tema

bp_geocatalog = Blueprint('geocatalog', __name__)

@bp_geocatalog.route("/api/geocatalog")
def get_geocatalog():
    result = []
    for tema in Tema.query.all():
        tema_data = {
            "id": tema.id,
            "nama": tema.nama,
            "subtemas": []
        }
        for sub in tema.subtemas:
            sub_data = {
                "id": sub.id,
                "nama": sub.nama,
                "petas": [
                    {
                        "id": p.id,
                        "nama": p.nama,
                        "filename": p.filename
                    } for p in sub.petas
                ]
            }
            tema_data["subtemas"].append(sub_data)
        result.append(tema_data)
    return jsonify(result)