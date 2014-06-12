#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import jinja2
import os
import webapp2
from google.appengine.api import channel
from google.appengine.api import users

class ChannelReceiveHandler(webapp2.RequestHandler):

  def post(self):

    msg = self.request.get('msg')

    user = users.get_current_user()

    channel.send_message("shared_channel", msg)

class MainHandler(webapp2.RequestHandler):
  """This page is responsible for showing the game UI. It may also
  create a new game or add the currently-logged in user to a game."""

  def get(self):

    user = users.get_current_user()

    if not user:
      self.redirect(users.create_login_url(self.request.uri))
      return

    token = channel.create_channel("shared_channel")

    template_values = {
        "token": token,
        "nickname": user.nickname()
    }

    template = jinja_environment.get_template("index.html")
    
    self.response.out.write(template.render(template_values))

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

app = webapp2.WSGIApplication([
    ("/", MainHandler),
    ("/_ah/channel/receive", ChannelReceiveHandler)
], debug=True)
