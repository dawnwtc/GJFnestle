from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# 使用绝对路径
JSON_FILE_PATH = r'C:\Users\Administrator\AppData\Roaming\kingsoft\wps\jsaddons\GJFnestle_1.0.0\data\schedule.json'

@app.route('/update-schedule', methods=['POST'])
def update_schedule():
    try:
        # 获取请求中的 JSON 数据
        new_schedule_data = request.json
        
        # 将数据写入 JSON 文件
        with open(JSON_FILE_PATH, 'w', encoding='utf-8') as file:
            json.dump(new_schedule_data, file, ensure_ascii=False, indent=4)
        
        # 返回成功响应
        return jsonify({'status': 'success', 'message': 'Schedule updated successfully'}), 200
    except Exception as e:
        # 返回错误响应
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/get-schedule', methods=['GET'])
def get_schedule():
    try:
        # 读取 JSON 文件
        with open(JSON_FILE_PATH, 'r', encoding='utf-8') as file:
            schedule_data = json.load(file)
        
        # 返回成功响应
        return jsonify(schedule_data), 200
    except Exception as e:
        # 返回错误响应
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
