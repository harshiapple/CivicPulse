from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

app = Flask(__name__)


# -----------------------------
# Text Preprocessing
# -----------------------------
def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', '', text)
    return text.strip()


# -----------------------------
# AI Category & Priority
# -----------------------------
def predict_category_priority(text):

    text = preprocess(text)

    if any(word in text for word in [
        "street light",
        "streetlight",
        "lamp post",
        "lamp",
        "bulb"
    ]):
        return "Street Lights", "MEDIUM"

    if any(word in text for word in [
        "pothole",
        "road damage",
        "broken road",
        "road crack",
        "damaged road",
        "road"
    ]):
        return "Roads", "HIGH"

    if any(word in text for word in [
        "garbage",
        "trash",
        "waste",
        "dustbin"
    ]):
        return "Garbage", "HIGH"

    if any(word in text for word in [
        "water",
        "pipe",
        "leak",
        "tap"
    ]):
        return "Water Supply", "MEDIUM"

    if any(word in text for word in [
        "drain",
        "drainage",
        "sewage"
    ]):
        return "Sewage", "HIGH"

    if any(word in text for word in [
        "electricity",
        "power",
        "transformer",
        "current"
    ]):
        return "Electricity", "HIGH"

    return "Others", "LOW"


# -----------------------------
# Duplicate Detection API
# -----------------------------
@app.route("/check-duplicate", methods=["POST"])
def check_duplicate():

    data = request.get_json()

    title = data.get("title", "")
    description = data.get("description", "")
    location = data.get("location", "")

    existing = data.get("existing", [])

    new_text = preprocess(f"{title} {description} {location}")

    category, priority = predict_category_priority(new_text)

    # No complaints exist yet
    if not existing:
        return jsonify({
            "duplicate": False,
            "score": 0.0,
            "category": category,
            "priority": priority,
            "matchedComplaint": None
        })

    texts = [new_text]

    for complaint in existing:
        text = preprocess(
            complaint.get("title", "") + " " +
            complaint.get("description", "") + " " +
            complaint.get("location", "")
        )
        texts.append(text)

    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2)
    )

    tfidf = vectorizer.fit_transform(texts)

    similarities = cosine_similarity(
        tfidf[0:1],
        tfidf[1:]
    )[0]

    max_score = float(similarities.max())
    best_index = int(similarities.argmax())

    print("=" * 60)
    print("NEW COMPLAINT")
    print(new_text)
    print("Category :", category)
    print("Priority :", priority)
    print("Similarity Scores :", similarities)
    print("Highest Score :", max_score)
    print("=" * 60)

    if max_score >= 0.50:
        return jsonify({
            "duplicate": True,
            "score": round(max_score, 2),
            "category": category,
            "priority": priority,
            "matchedComplaint": existing[best_index]
        })

    return jsonify({
        "duplicate": False,
        "score": round(max_score, 2),
        "category": category,
        "priority": priority,
        "matchedComplaint": None
    })


@app.route("/")
def home():
    return "CivicPulse AI Service Running"


if __name__ == "__main__":
    app.run(debug=True, port=5000)