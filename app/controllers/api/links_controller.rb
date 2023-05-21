module Api
  class LinksController < ApplicationController
    before_action :set_link, only: %i[track_link show]

    # GET /api/links - List all links and related transactions. 
    def index
      @link = Link.all
      if @link
        return_link_response(@link) 
      else 
        return_error("Failed to fetch link list.", :bad_request) 
      end
    end

    # GET /api/links/{url_slug} - Get link based on url_slug.
    def show 
      if @link.nil? 
        return_error("Link not found.", :not_found) and return
      end
        return_link_response(@link)
    end

    # GET /{url_slug} - Redirect to original_url and save click transaction.
    def track_link
      if @link.nil? 
        return_error("Link not found.", :not_found) and return
      end

      @transaction = Transaction.new
      @transaction.link_id = @link.id
      @transaction.geolocation = request.remote_ip

      if @link.update_attribute(:clicks, @link.clicks + 1) && @transaction.save
        redirect_to(@link.original_url, allow_other_host: true)
      else           
        return_error("Failed to redirect to original url.", :bad_request) 
      end
    end

    # POST /api/links - Create new link record through request body { original_url: "URL_LINK" }
    def create
      @link = Link.new
      @link.request_protocol = request.protocol
      @link.request_host = request.host_with_port
      @link.original_url = params[:original_url]
      
      if @link.save
        return_link_response(@link) 
      else 
        return_error("Failed to add new url.", :bad_request) 
      end
    end

    private
      def set_link
        @link = Link.where(url_slug: params[:url_slug]).first
      end

      def return_error(error_message, status_code)
        render json: {
          error: error_message
        },
        status: status_code
      end

      def return_link_response(link)
        render json: link, 
        include: { 
          transactions: { 
            except: [:id, :updated_at, :link_id] 
          }
        },
        except: [:id, :updated_at],
        status: :ok
      end
  end
end
