from app.extensions import db

class Subtema(db.Model):
    __tablename__ = 'subtema'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)

    tema_id = db.Column(db.Integer, db.ForeignKey('tema.id'), nullable=False)
    tema = db.relationship('Tema', back_populates='subtemas')

    petas = db.relationship('Peta', back_populates='subtema', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Subtema {self.nama}>"