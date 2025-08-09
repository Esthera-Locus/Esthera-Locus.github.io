from app.extensions import db

class Peta(db.Model):
    __tablename__ = 'peta'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(150), nullable=False)
    filename = db.Column(db.String(200), nullable=False)

    subtema_id = db.Column(db.Integer, db.ForeignKey('subtema.id'), nullable=False)
    subtema = db.relationship('Subtema', back_populates='petas')

    def __repr__(self):
        return f"<Peta {self.nama}>"

