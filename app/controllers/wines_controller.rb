class WinesController < ApplicationController

    def create
        wine = Wine.create!(wine_params)
        render json: wine, status: :created
    end

    def index
        render json: @current_user.wines
    end

    def update
        wine = Wine.find_by(id: params[:id])
        wine.update(wine_params)
        render json: wine
    end

    def destroy
        find_wine.destroy
        head :no_content
    end

    private

    def find_wine
        Wine.find(params[:id])
    end

    def wine_params
        params.permit(:name, :vintage, :country, :region, :grape, :rating, :image, :tasting, :memory, :user_id)
    end

end
