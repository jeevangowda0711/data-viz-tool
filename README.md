Kevin Byon CWID: 887345262

email: kbyon@csu.fullerton.edu

Johnny Quach CWID: 885168989

email: JqJohnny@csu.fullerton.edu

Jeevan Gowda Hemanth Kumar CWID: 885168989

email: jeevangowda@csu.fullerton.edu

Samantha Rehome CWID: 887904126

email: 4srehome@csu.fullerton.edu

# VizAI

## Technology Stack
- **Backend:** FastAPI, SQLAlchemy, Alembic, Redis, OAuth2, Pydantic
- **Frontend:** React, Axios
- **Database:** PostgreSQL (default), SQLite (development fallback)
- **Deployment:** Docker, CI/CD Pipeline

## Project Structure
### Backend
- app/api: API routes for authentication, dataset upload, visualization, and AI insights.
- app/core: Core functionalities like security and configuration.
- app/models: SQLAlchemy models for the database schema.
- app/schemas: Pydantic models for request and response validation.
- app/services: Business logic for various functionalities.
- app/caching: Caching logic using Redis.
- app/tests: Unit tests for backend components.
### Frontend
- public: Public assets for the React application.
- src/components: React components for:
    - auth/
        - AuthForm.tsx: Implement form validation and error handling.
    - dashboard/
        - DatasetUpload.tsx: Add file validation and preprocessing feedback.
        - VisualizationBuilder.tsx: Enhance user interface for configuring visualizations and improve chart rendering and error handling.
        - AIInsights.tsx: Display AI-generated insights with better UI/UX.Authentication
        - DashboardOverview.tsx: Display dashboard
        - Sidebar.tsx: Implement navigation between components
- src/services: API service handlers for backend communication.

## API Routes
### Authentication
- **post("/signup", response_model=UserResponse)**
    - Input:
        - user: UserCreate
            - email: str
            - password: str
        - db: Session = Depends(get_db)
    - Output:
        - UserResponse
            - id: int
            - email: str
- **post("/login")**
    - Input:
        - form_data: OAuth2PasswordRequestForm = Depends()
        - db: Session = Depends(get_db)
    - Output:
        - access_token: str
        - token_type: "bearer"
### Dataset Upload
- **post("/upload", response_model=DatasetResponse)**
    - Input:
        - file: UploadFile = File(...)
        - db: Session = Depends(get_db)
    - Output:
        - DatasetResponse
            - id: int
            - name: str
            - data: str
- **get("/{dataset_id}", response_model=DatasetResponse)**
    - Input:
        - dataset_id: int
        - db: Session = Depends(get_db)
    - Output:
        - DatasetResponse
            - id: int
            - name: str
            - data: str
- **get("/", response_model=List[DatasetResponse])**
    - Input:
        - db: Session = Depends(get_db)
    - Output:
        - List[DatasetResponse]
            - [id: int, name: str, data: str]
### Visualization
- **post("/create", response_model=VisualizationResponse)**
    - Input:
        - visualization: VisualizationCreate
            - user_id: int
            - chart_type: str
            - config_data: str
        - db: Session = Depends(get_db)
    - Output: 
        - VisualizationResponse
            - id: int
            - user_id: int
            - chart_type: str
            - config_data: str
- **get("/{visualization_id}", response_model=VisualizationResponse)**
    - Input:
        - visualization_id: int
        - db: Session = Depends(get_db)
    - Output:
        - VisualizationResponse
            - id: int
            - user_id: int
            - chart_type: str
            - config_data: str
### AI Insights
- **post("/insights")**
    - Input:
        - request: InsightsRequest
            - dataset_id: int
        - db: Session = Depends(get_db)
    - Output:
        - insights: str

## Database Schema Models
- Dataset
    - tablename = 'datasets'
    - id = Column(Integer, primary_key=True, index=True)
    - name = Column(String, index=True)
    - data = Column(Text)
- User
    - tablename = 'users'
    - id = Column(Integer, primary_key=True, index=True)
    - email = Column(String, unique=True, index=True, nullable=False)
    - hashed_password = Column(String, nullable=False)
    - created_at = Column(DateTime(timezone=True), server_default=func.now())
    - updated_at = Column(DateTime(timezone=True), onupdate=func.now())
- Vizualization
    - tablename = 'visualizations'
    - id = Column(Integer, primary_key=True, index=True)
    - user_id = Column(Integer, ForeignKey("users.id"))
    - chart_type = Column(String, index=True)
    - config_data = Column(Text)

## Request & Response Validation Schemas
- DatasetCreate
    - name: str
    - data: str
- DatasetResponse
    - id: int
    - name: str
    - data: str
    - orm_mode = True
- UserCreate
    - email: str
    - password: str
- UserResponse
    - id: int
    - email: str
    - orm_mode = True
- VisualizationCreate
    - user_id: int
    - chart_type: str
    - config_data: str
- VisualizationResponse
    - id: int
    - user_id: int
    - chart_type: str
    - config_data: str
    - orm_mode = True

## Services
- **auth_service.py:** Handle business logic for user authentication, including login and signup.
- **dataset_service.py:** Process datasets for visualization.
- **visualization_service.py:** Handle visualization creation and retrieval logic.
- **ai_service.py:** Integrate with AI APIs to generate insights from datasets.