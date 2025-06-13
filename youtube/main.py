from flask import Flask, request, jsonify, send_from_directory
import os, cv2, yt_dlp, threading, time
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
PDF_OUTPUT_DIR = 'static/pdfs'
SLIDE_OUTPUT_DIR = 'static/slides'
VIDEO_FILENAME = 'video.mp4'

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

os.makedirs(PDF_OUTPUT_DIR, exist_ok=True)
os.makedirs(SLIDE_OUTPUT_DIR, exist_ok=True)

def schedule_cleanup(paths, delay=60):
    def delete_files():
        for path in paths:
            try:
                if os.path.isfile(path):
                    os.remove(path)
                elif os.path.isdir(path):
                    for file in os.listdir(path):
                        os.remove(os.path.join(path, file))
            except Exception as e:
                print(f"Error deleting {path}: {e}")
    timer = threading.Timer(delay, delete_files)
    timer.start()

@app.route('/process_video', methods=['POST'])
def process_video():
    data = request.get_json()
    video_url = data.get('video_url')
    gap_seconds = int(data.get('gap_seconds', 2))

    video_filename = VIDEO_FILENAME

    # --- Step 1: Download Video ---
    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
        'outtmpl': video_filename,
        'quiet': True,
        'merge_output_format': 'mp4'
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])

    # --- Step 2: Extract slides ---
    cap = cv2.VideoCapture(video_filename)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(fps * gap_seconds)

    frame_count = 0
    slide_count = 0
    prev_frame = None
    threshold = 300000
    image_paths = []

    while True:
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_count)
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        if prev_frame is not None:
            diff = cv2.absdiff(prev_frame, gray)
            non_zero_count = cv2.countNonZero(diff)
            if non_zero_count > threshold:
                slide_count += 1
                path = f"{SLIDE_OUTPUT_DIR}/slide_{slide_count}.jpg"
                cv2.imwrite(path, frame)
                image_paths.append(path)
        prev_frame = gray
        frame_count += frame_interval

    cap.release()

    # --- Step 3: Convert to PDF ---
    pdf_path = os.path.join(PDF_OUTPUT_DIR, "slides.pdf")
    images = [Image.open(p).convert('RGB') for p in image_paths]
    if images:
        images[0].save(pdf_path, save_all=True, append_images=images[1:])
    else:
        return jsonify({"error": "No slides extracted"}), 400

    # --- Step 4: Schedule cleanup ---
    schedule_cleanup(
        paths=[video_filename, pdf_path, SLIDE_OUTPUT_DIR],  # Delete video, PDF, and slides
        delay=60  # 1 minute
    )

    # --- Step 5: Send link to frontend ---
    return jsonify({
        "pdf_url": f"http://localhost:5000/pdfs/slides.pdf"
    })

# Serve PDF statically
@app.route('/pdfs/<filename>')
def serve_pdf(filename):
    return send_from_directory(PDF_OUTPUT_DIR, filename)

if __name__ == '__main__':
    app.run(debug=True)
