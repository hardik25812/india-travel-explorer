// Local Storage Keys
const USERS_KEY = 'india_travel_users';
const CURRENT_USER_KEY = 'india_travel_current_user';
const SAVED_LANDMARKS_KEY = 'india_travel_saved_landmarks';
const TRIP_PLANS_KEY = 'india_travel_trip_plans';
const EMERGENCY_CONTACTS_KEY = 'india_travel_emergency_contacts';

// Local storage is always configured
export const isSupabaseConfigured = false;

// Types that emulate what we'd get from Supabase
type User = {
  id: string;
  email: string;
  name?: string;
  password?: string; // Only for local development
};

type SavedLandmark = {
  id: string;
  userId: string;
  landmarkId: string;
  name: string;
  image?: string;
  location?: string;
  createdAt: string;
};

type TripPlan = {
  id: string;
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  notes?: string;
  createdAt: string;
};

type EmergencyContact = {
  id: string;
  userId: string;
  name: string;
  phone: string;
  relationship: string;
  notes?: string;
  createdAt: string;
};

// Initialize local storage if needed
const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return;
  
  // Initialize collections if they don't exist
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([
      {
        id: 'demo-user-1',
        email: 'demo@example.com',
        name: 'Demo User',
        password: 'password' // Only for demo
      }
    ]));
  }
  
  if (!localStorage.getItem(SAVED_LANDMARKS_KEY)) {
    localStorage.setItem(SAVED_LANDMARKS_KEY, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(TRIP_PLANS_KEY)) {
    localStorage.setItem(TRIP_PLANS_KEY, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(EMERGENCY_CONTACTS_KEY)) {
    localStorage.setItem(EMERGENCY_CONTACTS_KEY, JSON.stringify([]));
  }
};

// Helper to get data from local storage
const getCollection = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return [];
  }
};

// Helper to save data to local storage
const saveCollection = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Local storage client that mimics Supabase functionality
const createLocalStorageClient = () => {
  // Initialize storage on client
  if (typeof window !== 'undefined') {
    initializeLocalStorage();
  }
  
  return {
    auth: {
      getUser: () => {
        const currentUser = localStorage.getItem(CURRENT_USER_KEY);
        if (!currentUser) {
          return Promise.resolve({ data: { user: null }, error: null });
        }
        
        try {
          const user = JSON.parse(currentUser);
          return Promise.resolve({ data: { user }, error: null });
        } catch (error) {
          return Promise.resolve({ data: { user: null }, error });
        }
      },
      getSession: () => {
        const currentUser = localStorage.getItem(CURRENT_USER_KEY);
        if (!currentUser) {
          return Promise.resolve({ data: { session: null }, error: null });
        }
        
        try {
          const user = JSON.parse(currentUser);
          const session = { user };
          return Promise.resolve({ data: { session }, error: null });
        } catch (error) {
          return Promise.resolve({ data: { session: null }, error });
        }
      },
      signIn: ({ email, password }: { email: string; password: string }) => {
        const users = getCollection<User>(USERS_KEY);
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          // Remove password before storing in session
          const { password, ...safeUser } = user;
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
          return Promise.resolve({ data: { user: safeUser }, error: null });
        }
        
        return Promise.resolve({ 
          data: { user: null }, 
          error: { message: 'Invalid login credentials' } 
        });
      },
      signUp: ({ email, password, name }: { email: string; password: string; name?: string }) => {
        const users = getCollection<User>(USERS_KEY);
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
          return Promise.resolve({ 
            data: { user: null }, 
            error: { message: 'User already exists' } 
          });
        }
        
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          password,
          name
        };
        
        users.push(newUser);
        saveCollection(USERS_KEY, users);
        
        // Remove password before storing in session
        const { password: _, ...safeUser } = newUser;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
        
        return Promise.resolve({ data: { user: safeUser }, error: null });
      },
      signOut: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
        return Promise.resolve({ error: null });
      },
      onAuthStateChange: (callback: any) => {
        // This is a simplified version that doesn't actually listen for changes
        // In a real implementation, you'd use events
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
    },
    from: (table: string) => ({
      select: (columns = '*') => ({
        eq: (column: string, value: string) => {
          let collection: any[] = [];
          
          switch(table) {
            case 'saved_landmarks':
              collection = getCollection<SavedLandmark>(SAVED_LANDMARKS_KEY);
              break;
            case 'trip_plans':
              collection = getCollection<TripPlan>(TRIP_PLANS_KEY);
              break;
            case 'emergency_contacts':
              collection = getCollection<EmergencyContact>(EMERGENCY_CONTACTS_KEY);
              break;
            case 'users':
              collection = getCollection<User>(USERS_KEY);
              break;
            default:
              return { data: [], error: { message: `Table ${table} not found` } };
          }
          
          const filteredData = collection.filter(item => item[column] === value);
          return { data: filteredData, error: null };
        }
      }),
      insert: (data: any) => {
        try {
          let collection: any[] = [];
          let key = '';
          
          switch(table) {
            case 'saved_landmarks':
              collection = getCollection<SavedLandmark>(SAVED_LANDMARKS_KEY);
              key = SAVED_LANDMARKS_KEY;
              data.id = `landmark-${Date.now()}`;
              data.createdAt = new Date().toISOString();
              break;
            case 'trip_plans':
              collection = getCollection<TripPlan>(TRIP_PLANS_KEY);
              key = TRIP_PLANS_KEY;
              data.id = `trip-${Date.now()}`;
              data.createdAt = new Date().toISOString();
              break;
            case 'emergency_contacts':
              collection = getCollection<EmergencyContact>(EMERGENCY_CONTACTS_KEY);
              key = EMERGENCY_CONTACTS_KEY;
              data.id = `contact-${Date.now()}`;
              data.createdAt = new Date().toISOString();
              break;
            case 'users':
              collection = getCollection<User>(USERS_KEY);
              key = USERS_KEY;
              data.id = `user-${Date.now()}`;
              break;
            default:
              return { data: null, error: { message: `Table ${table} not found` } };
          }
          
          collection.push(data);
          saveCollection(key, collection);
          
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      },
      update: (data: any) => ({
        eq: (column: string, value: string) => {
          try {
            let collection: any[] = [];
            let key = '';
            
            switch(table) {
              case 'saved_landmarks':
                collection = getCollection<SavedLandmark>(SAVED_LANDMARKS_KEY);
                key = SAVED_LANDMARKS_KEY;
                break;
              case 'trip_plans':
                collection = getCollection<TripPlan>(TRIP_PLANS_KEY);
                key = TRIP_PLANS_KEY;
                break;
              case 'emergency_contacts':
                collection = getCollection<EmergencyContact>(EMERGENCY_CONTACTS_KEY);
                key = EMERGENCY_CONTACTS_KEY;
                break;
              case 'users':
                collection = getCollection<User>(USERS_KEY);
                key = USERS_KEY;
                break;
              default:
                return { data: null, error: { message: `Table ${table} not found` } };
            }
            
            const updatedCollection = collection.map(item => {
              if (item[column] === value) {
                return { ...item, ...data };
              }
              return item;
            });
            
            saveCollection(key, updatedCollection);
            
            return { data: data, error: null };
          } catch (error) {
            return { data: null, error };
          }
        }
      }),
      delete: () => ({
        eq: (column: string, value: string) => {
          try {
            let collection: any[] = [];
            let key = '';
            
            switch(table) {
              case 'saved_landmarks':
                collection = getCollection<SavedLandmark>(SAVED_LANDMARKS_KEY);
                key = SAVED_LANDMARKS_KEY;
                break;
              case 'trip_plans':
                collection = getCollection<TripPlan>(TRIP_PLANS_KEY);
                key = TRIP_PLANS_KEY;
                break;
              case 'emergency_contacts':
                collection = getCollection<EmergencyContact>(EMERGENCY_CONTACTS_KEY);
                key = EMERGENCY_CONTACTS_KEY;
                break;
              case 'users':
                collection = getCollection<User>(USERS_KEY);
                key = USERS_KEY;
                break;
              default:
                return { data: null, error: { message: `Table ${table} not found` } };
            }
            
            const filteredCollection = collection.filter(item => item[column] !== value);
            saveCollection(key, filteredCollection);
            
            return { data: { count: collection.length - filteredCollection.length }, error: null };
          } catch (error) {
            return { data: null, error };
          }
        }
      }),
    }),
  };
};

export const createServerSupabaseClient = () => {
  return createLocalStorageClient();
};

let clientLocalStorageClient: ReturnType<typeof createLocalStorageClient> | null = null;

export const createClientSupabaseClient = () => {
  if (typeof window === 'undefined') {
    return createLocalStorageClient();
  }
  
  if (clientLocalStorageClient) return clientLocalStorageClient;
  
  clientLocalStorageClient = createLocalStorageClient();
  return clientLocalStorageClient;
};
