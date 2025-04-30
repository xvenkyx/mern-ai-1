from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import faiss
import numpy as np

app = FastAPI()

dimension = 1536
index = faiss.IndexFlatL2(dimension)
texts = []

class VectorInput(BaseModel):
    vectors: list[list[float]]
    texts: list[str]

class QueryInput(BaseModel):
    query: list[float]
    k: int = 3

@app.post("/add")
def add_vectors(data: VectorInput):
    global texts
    try:
        vecs = np.array(data.vectors).astype('float32')
        index.add(vecs)
        texts.extend(data.texts)
        return {"message": f"{len(vecs)} vectors added."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query")
def query_vector(query: QueryInput):
    try:
        q = np.array([query.query]).astype('float32')
        D, I = index.search(q, query.k)
        return {
            "results": [texts[i] for i in I[0]]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run this command using -> uvicorn main:app --reload --port 8001