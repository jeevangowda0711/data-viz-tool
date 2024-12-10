Kevin Byon CWID: 887345262

email: kbyon@csu.fullerton.edu

Johnny Quach CWID: 885168989

email: JqJohnny@csu.fullerton.edu

Jeevan Gowda Hemanth Kumar CWID: 885168989

email: jeevangowda@csu.fullerton.edu

Samantha Rehome CWID: 887904126

email: 4srehome@csu.fullerton.edu

# VizAI

VizAI is a web application that allows users to upload datasets, generate AI-driven insights, and create visualizations. The application is built using FastAPI for the backend and React for the frontend. It leverages Google Generative AI for generating insights from datasets.

## Project Structure

### Backend

The backend is built using FastAPI and includes the following components:

- **app**: Contains the main application code.
  - **api**: Contains the API routes.
    - **auth.py**: Handles user authentication.
    - **dataset_upload.py**: Manages dataset upload routes, including validation and preprocessing.
    - **visualization.py**: Manages visualization creation and retrieval routes.
    - **ai_insights.py**: Integrates AI APIs to generate insights from datasets.
  - **core**: Contains core configuration and utilities.
    - **config.py**: Holds application configuration variables, including database URIs and secret keys.
  - **models**: Contains the database models.
    - **base.py**: Base model for SQLAlchemy.
    - **user.py**: User model.
    - **dataset.py**: Dataset model.
    - **visualization.py**: Visualization model.
  - **schemas**: Contains the Pydantic schemas for request and response validation.
    - **user.py**: User schema.
    - **dataset.py**: Dataset schema.
    - **visualization.py**: Visualization schema.
  - **services**: Contains the business logic for various functionalities.
    - **ai_service.py**: Handles AI-driven insights generation.
    - **dataset_service.py**: Handles dataset processing and storage.
    - **visualization_service.py**: Handles visualization creation and retrieval.
    - **caching**: Contains the caching logic using Redis.
    - **cache.py**: Configures the Redis client and provides caching utilities.
  - **main.py**: Main entry point for the FastAPI application.

### Frontend

The frontend is built using React and includes the following components:

- **src**: Contains the main application code.
  - **components**: Contains the React components.
    - **dashboard**: Contains the dashboard components.
      - **AIInsights.tsx**: Component for showing AI-generated insights from datasets.
      - **VisualizationBuilder.tsx**: Component for creating visualizations.
  - **services**: Contains the API service configurations.
    - **api.js**: Configures the Axios instance for making API requests.
  - **store**: Contains the state management logic.
    - **authStore.ts**: Manages authentication state.

### Database

The application uses SQLAlchemy for ORM and Alembic for database migrations. The database models are defined in the `app/models` directory.

### AI Integration

The application integrates with Google Generative AI to generate insights from datasets. The AI integration logic is handled in the `app/services/ai_service.py` file.

### Caching

The application uses Redis for caching to improve performance and scalability. Caching is implemented for the following functionalities:

- **Datasets**: Uploaded datasets are cached to reduce the load on the database and speed up retrieval times.
- **Visualizations**: Created visualizations are cached to reduce the load on the database and speed up retrieval times.
- **AI Insights**: Generated AI insights are cached to avoid repeated computations and speed up retrieval times.

## Prerequisites

- Python 3.10+
- Node.js 14+
- PostgreSQL (or any other database supported by SQLAlchemy)
- Redis (for caching and other purposes)


## Installation

### Backend

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/VizAI.git
   cd VizAI/backend
   ```

2. **Create a virtual environment**:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the dependencies**:

   ```sh
   pip install -r requirements.txt
   ```

4. **Set up the environment variables**:

   Create a `.env` file in the `backend` directory and add the following variables:

   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET_KEY=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Run the database migrations**:

   ```sh
   alembic upgrade head
   ```

6. **Start the backend server**:

   ```sh
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend

1. **Navigate to the frontend directory**:

   ```sh
   cd ../frontend
   ```

2. **Install the dependencies**:

   ```sh
   npm install
   ```

3. **Start the frontend development server**:

   ```sh
   npm run dev
   ```

## Running the Project

1. **Start the backend server**:

   ```sh
   cd backend
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

2. **Start the frontend development server**:

   ```sh
   cd frontend
   npm run dev
   ```

3. **Open the application**:

   Open your browser and navigate to `http://localhost:4321` to access the application.

## Usage

1. **Sign Up / Log In**:
   - Create a new account or log in with an existing account.

2. **Upload Dataset**:
   - Navigate to the dataset upload section and upload a CSV file.

3. **Generate AI Insights**:
   - Select a dataset and generate AI-driven insights.

4. **Create Visualizations**:
   - Use the visualization builder to create visualizations based on the dataset.

## Testing

### Backend

1. **Run the tests**:

   ```sh
   pytest
   ```

### Frontend

1. **Run the tests**:

   ```sh
   npm test
   ```

## Contributing

1. **Fork the repository**.
2. **Create a new branch**:

   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**.
4. **Commit your changes**:

   ```sh
   git commit -m "Add your commit message"
   ```

5. **Push to the branch**:

   ```sh
   git push origin feature/your-feature-name
   ```

6. **Create a pull request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```