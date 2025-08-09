from app.extensions import db

class Tema(db.Model):
    __tablename__ = 'tema'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)

    subtemas = db.relationship('Subtema', back_populates='tema', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Tema {self.nama}>"
