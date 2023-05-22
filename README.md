# URL Shortener Service
<p>Welcome to Ben's URL Shortener Service build with <b>React + Ruby on Rails</b>.</p>

![benly](https://github.com/bkhoo1999/url-shortener-service/assets/69798823/969994a1-cca6-42c6-90f8-a1ca775ff3d3)

## Installation

### <u>Prerequisites</u>
* Node/Npm: https://nodejs.org/en
* Ruby on Rails: https://guides.rubyonrails.org/v5.0/getting_started.html
* PostgreSQL: https://www.postgresql.org/download/
* Git: https://git-scm.com/downloads

Tools (This is self preference, do use tools of your choice) :
* PostgreSQL Database Management:
    * PGAdmin: https://www.pgadmin.org/
    
* Code IDE:
    * Visual Studio Code: https://code.visualstudio.com/
    * RubyMine: https://www.jetbrains.com/ruby/ 
    
### <u>Git Clone</u>
<p>In desired directory path terminal run:</p>
<pre>
    git clone https://github.com/bkhoo1999/url-shortener-service.git
</pre>
<p>Clones repository into local directory.</p>

### <u>Database Setup</u>
<p>In project <b>root</b> terminal run:</p>
<pre>
    rake db:create <b>OR</b> rails db:create
    rake db:migrate <b>OR</b> rails db:migrate
</pre>
<p>Creates a DB in your PostgreSQL local servers and migrates existing table using DB migrations.</p>

### <u>API Installation</u>
<p>In project <b>root</b> terminal run:</p>
<pre>
    bundle <b>OR</b> gem install
</pre>
<p>Install all Gem packages/dependencies for Rails.</p>

#### Package Information

* Testing with <b>RSpec</b> and <b>FactoryBot</b>.
* Increase development effieciency with <b>Foreman</b> scripting.
* Web scraping to retrieve URL title with <b>Mechanize</b>.

### <u>Web Installation</u>
<p>In project <b>root/client</b> terminal run:</p>
<pre>
    cd client
    npm install
</pre>
<p>Install all Node packages/dependencies for React.</p>

#### Package Information

* Npm Web packages: https://github.com/bkhoo1999/url-shortener-service/tree/main/client

### <u>Start Up</u>
* Method 1 (Single Terminal):

    <pre>rake start</pre>
    API: Runs on http://localhost:3000<br/>
    Web: Runs on http://localhost:5000
* Method 2 (Double Terminal):
    * Terminal 1 (API):
    
        <pre>rails s</pre>
        Runs on http://localhost:3000
        
    * Terminal 2 (Web):
    
        <pre>cd client<br/>npm start</pre>
        Runs on http://localhost:5096
        
## Data Structure
<p>Link:<p>
<pre>
{
    id: string,
    original_url: string,
    short_url: string,
    url_slug: string,
    title: string,
    transactions: Transaction[],
    timestamp: {
        created_at: Date,
        updated_at: Date
    }
}
</pre>

<p>HAS MANY Transactions<p>
<pre>
{
    id: string,
    link_id: string,
    geolocation: string,
    timestamp: {
        created_at: Date,
        updated_at: Date
    }
}
</pre>

## API Endpoints
<pre>
<b>GET /api/links</b>
    - Fetch all links with related transactions.
    
<b>GET /api/links/{url_slug}</b>
    - Fetch single link with related transactions based on url_slug param.
    
<b>GET /{url_slug}</b>
    - Redirect to original_url and track access.
    
<b>POST /api/links</b>
    - Request body: { original_url: "" }
    - Create new link with click count default value of 0.
</pre>

## Application Information
* This application accepts a validated targeted URL input, and generates a short URL. Every short URL:
    * has a generated slug with 6 alphanumeric characters.
    * has a targeted URL linked to it and is sharable among similar targeted URLs. 

* Generating a short URL will save targeted URL's:
    * Title
    * Original URL
    * Short URL
    * URL Slug
    * Created Date
    * Clicks (starting with 0)

* Accessing a short URL will be displayed and tracks:
    * Amount of clicks
    * Visitor's geolocation IP Address
    * Access time

* This application is currently live, <b>deployed</b> on:
    * API - https://ben-ly.herokuapp.com/
    * Web - https://benly.netlify.app/
    
# - END -