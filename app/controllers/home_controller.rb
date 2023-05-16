class HomeController < ApplicationController
  def index
    render json: { message: "URL Shortener Service"}
  end
end
