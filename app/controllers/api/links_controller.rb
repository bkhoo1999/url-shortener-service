module Api
  class LinksController < ApplicationController
    before_action :set_link, only: %i[track_link show index create]

    # GET /api/links - List all links and related transactions. 
    def index
      return_link_response(Link.all)
    end

    # GET /api/links/{url_slug} - Get link based on url_slug.
    def show 
      if @link.nil? 
        return_link_not_found_error and return
      end
      return_link_response(@link)
    end

    # GET /{url_slug} - Redirect to original_url and save click transaction.
    def track_link
      if @link.nil? 
        return_link_not_found_error and return
      end

      @transaction = Transaction.new
      @transaction.link_id = @link.id
      @transaction.geolocation = request.remote_ip

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

    # POST /api/links - Create new link record through request body { original_url: "URL_LINK" }
    def create
      @link = Link.new
      @link.request = request
      @link.original_url = params[:original_url]
      
      if @link.save
          return_link_response(@link) 
      else 
        render json: @link.errors, status: :bad_request
      end
    end

    private
      def set_link
        @link = Link.where(url_slug: params[:url_slug]).first
      end

      def return_link_not_found_error 
        render json: {
          error: "Link not found"
        },
        status: :not_found
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
