from flask_restful import Api, Resource, reqparse

class HangmanHandler(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Hangman Api Handler"
      }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)






# @app.route("/hangman", methods=["GET"])
# def hangman():
#     req_json = request.get_json()


# @app.route("/hangman", methods=["GET"])
# def hangman():
#     req_json = request.get_json()