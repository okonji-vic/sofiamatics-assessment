# Sofiamatics Technical Test Hospital Dashboard

A modern, responsive hospital management dashboard that displays a comprehensive list of hospitals across Nigeria with search, and pagination capabilities.

## Features

- **Hospital Listing**: Display hospitals in a clean, paginated grid layout (10 per page)
- **Advanced Search**: Debounced search by hospital name for optimal performance
- **Detailed Views**: Click any hospital to view complete information in a modal
- **Pagination**: Navigate through pages with intelligent pagination UI
- **Loading States**: Skeleton loaders and smooth transitions while fetching data
- **Error Handling**: Graceful error messages and retry capabilities
- **Responsive Design**: Fully responsive across all device sizes
- **Performance Optimized**: API response caching with smart revalidation

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

**Note**: TanStack Query should already be included in your project. If not:
\`\`\`bash
npm install @tanstack/react-query
\`\`\`

### 2. Configure Environment Variables

Add the following to your `.env.local` file (or configure in the Vercel Vars section):

\`\`\`env
# For Vite projects
VITE_API_BASE_URL=https://your-api-domain.com

# For Create React App projects
REACT_APP_API_BASE_URL=https://your-api-domain.com
\`\`\`

Replace `https://your-api-domain.com` with your actual API base URL.

### 3. Axios Instance Configuration

The dashboard uses your existing axios instance from `/libs/axiosInstance.ts`. Ensure it:
- Handles authentication tokens (if required)
- Sets proper headers
- Handles interceptors for error management

### 4. Access the Dashboard

Navigate to `/users/hospitals` in your application. The dashboard is designed to work with an outlet-based routing structure (header + sidebar + dashboard content).

## Libraries Used & Why

### Core Framework
- **React 19** - Latest React features including better hooks and optimizations
- **TypeScript** - Provides type safety and better IDE support


### State Management & Data Fetching
- **TanStack Query (React Query)** - Powerful data fetching, caching, and synchronization
  - Why: Superior to manual state management for server state
  - Features: Automatic caching, background revalidation, stale-while-revalidate (SWR)
  - No Redux needed: Zustand is available but TanStack Query handles all data needs elegantly

### UI & Styling
- **shadcn/ui** - High-quality, accessible React components built on Radix UI
  - Why: Production-ready, fully customizable, excellent TypeScript support
- **Tailwind CSS** - Utility-first CSS framework for responsive design
  - Why: Fast development, consistent spacing, excellent responsive utilities
- **Lucide React** - Beautiful, consistent icon library
  - Why: Lightweight, tree-shakable, perfect for dashboards

### Animations & UX
- **Framer Motion** - Declarative animations for React
  - Why: Smooth card transitions, page animations, professional feel
  - Used for: Card entrance animations, pagination transitions, modal effects

### Data Fetching
- **Axios** - Promise-based HTTP client via your existing instance
  - Why: Cleaner API than Fetch, request/response interceptors, error handling

## File Structure

\`\`\`
project-root/
├── types/
│   └── hospital.ts              # TypeScript interfaces for hospitals
├── services/
│   └── hospitalServices.ts          # API service functions with TanStack Query
├── components/
|   └── hospitalDashboard/
│       ├── hospitalCard.tsx        # Individual hospital card
│       ├── hospitalFilters.tsx     # Filter & search controls
│       ├── hospitalDetailModal.tsx # Hospital details modal
│       └── hospitalPagination.tsx  # Pagination component
├── pages/
│   └── Dashboard.tsx               # Main dashboard page
│       
└── lib/
    └── axiosInstance.ts         # axios configuration
    └── data.ts                  # state and type of hospital data
    └── queryClient.ts           # configuring global settings for requests.
    └── utils.ts                 # contains reusable functions

└── store/
    └── themeStore.ts           # setting theme globally with zustand
    └── authStore.ts            # futuristic authentication setup with zustand
    
\`\`\`

## Key Implementation Details

### Data Fetching Pattern
\`\`\`typescript
// Uses TanStack Query for:
// - Automatic caching (5-minute stale time)
// - Background revalidation
// - Automatic retry on failure
// - Loading and error states
const { data, isLoading, error } = useQuery({
  queryKey: ['hospitals', filters],
  queryFn: () => fetchHospitals(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
\`\`\`

### Debounced Search
Built-in debounce (500ms) in the search input to prevent excessive API calls as users type.

### Error Handling
- API errors displayed in user-friendly alert messages
- Network errors automatically trigger retry logic
- Fallback UI states for empty results

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly components

## Performance Optimizations

1. **Query Caching**: Hospitals data cached for 5 minutes
2. **Debounced Search**: 500ms debounce on search input
3. **Memoized Components**: Hospital cards memoized to prevent unnecessary re-renders
4. **Lazy Component Loading**: Modal loads only when needed
5. **Pagination**: Only fetches data for current page

## Notes

### Current Implementation
- Displays 30 most recent hospitals paginated at 10 per page
- Supports filtering by type, state, country, and name
- Country ID hardcoded to 166 (Nigeria) - can be made configurable
- Complete hospital information available: name, email, phone, address, coordinates, state, type

### Future Improvements

1. **Advanced Filters UI**: Add filter chips/tags for visual feedback of active filters
2. **Hospital Comparison**: Compare multiple hospitals side-by-side
3. **Map Integration**: Display hospitals on a map with coordinates
4. **Favoriting System**: Save favorite hospitals to backend
5. **Sort Options**: Sort by name, distance, rating, etc.
6. **Hospital Categories**: Group hospitals by region or type
7. **Real-time Updates**: WebSocket integration for live hospital status updates
8. **Analytics**: Track user search/filter patterns




## Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.x | Core UI framework |
| typescript | ^5.x | Type safety |
| next | 16.x | Framework & routing |
| @tanstack/react-query | ^5.x | Data fetching & caching |
| axios | ^1.x | HTTP requests |
| tailwindcss | ^4.x | Styling |
| shadcn/ui | Latest | UI components |
| framer-motion | ^11.x | Animations |
| lucide-react | ^0.x | Icons |

## License

This project is part of the Hospital Management System and follows your organization's licensing terms.

## Support

For issues or questions about the dashboard:
1. Check the troubleshooting section above
2. Check TanStack Query documentation: https://tanstack.com/query
3. Check shadcn/ui documentation: https://ui.shadcn.com
