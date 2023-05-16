module Api
  class LinksController < ApplicationController
    before_action :set_link, only: %i[track_link show index create]

    def index
      @links = Link.all
      return_link_response(@links)
    end

    def show 
      return_link_response(@link)
    end

    def track_link
      @transaction = Transaction.new
      @transaction.link_id = @link.id
      @transaction.geolocation = request.ip

      if @link.update_attribute(:clicks, @link.clicks + 1) && @transaction.save
        redirect_to(@link.original_url, allow_other_host: true)
      else           
        render json: { 
          linkError: @link.errors, 
          transactionError: @transaction.errors 
        }, 
          status: :bad_request
      end
    end

    def create
      @link = Link.new
      @link.original_url = params[:original_url]
      
      if @link.is_new_link?
        @link.save ? 
          return_link_response(@link) : 
          (render json: @link.errors, status: :bad_request)
      else 
        @existing_link = Link.where(original_url: params[:original_url]).first
        return_link_response(@existing_link)
      end
    end

    private
      def set_link
        @link = Link.where(url_slug: params[:url_slug]).first
      end

      def return_link_response(link)
        render json: link, 
        include: { 
          transactions: { 
            except: [:id, :updated_at, :link_id] 
          }
        },
        except: [:id, :updated_at, :created_at],
        status: :ok
      end
  end
end
