# Pixel Quest - Gamified Todo Application

A unique productivity application that transforms task completion into an engaging pixel art discovery experience. Complete quests (tasks) to progressively reveal famous artwork masterpieces through a sophisticated pixel-by-pixel revelation system.

## 🎮 Key Features

### Progressive Gamification System
- **25 Difficulty Levels**: From Tutorial (Level 1) to Transcendent (Level 25)
- **XP-Based Progression**: Earn 25/50/100 XP for Easy/Medium/Hard quests
- **Multi-Artwork Levels**: Higher levels require completing multiple artworks
- **Smart Pixel Revelation**: Quest-based pixel unveiling system

### Artwork Discovery Experience
- **20+ Famous Artworks**: Including works by Picasso, Van Gogh, Ravi Varma, and more
- **Progressive Disclosure**: Artworks revealed pixel-by-pixel as you complete quests
- **Gallery Collection**: View all completed masterpieces in your personal gallery
- **Cultural Education**: Learn about artists and art periods through discovery

### Advanced Quest Management
- **Three Difficulty Levels**: Easy (25 XP), Medium (50 XP), Hard (100 XP)
- **Category Organization**: Work, Personal, Health, Learning categories
- **Persistent Progress**: Automatic save/restore using localStorage
- **Quest Editing**: Modify quest details after creation

## 🏗️ Technical Architecture

### Frontend Framework
- **React 18** with modern hooks and context API
- **Vite** for fast development and optimized builds
- **ES6+ Modules** with proper import/export structure
- **CSS-in-JS** for component-scoped styling

### State Management
- **React Context** for global game state
- **localStorage** for data persistence
- **Immutable State Updates** for reliable state management
- **Real-time Progress Tracking**

### Progression System Mathematics
- **Dynamic XP Scaling**: Each level requires progressively more XP
- **Quest-to-Pixel Mapping**: Precise pixel revelation calculations
- **Level Advancement Logic**: Automatic progression based on cumulative XP
- **Artwork Completion Detection**: Smart artwork switching within levels

## 📊 Level Progression Details

| Level Range | Artworks | Quest Difficulty | Time Investment |
|-------------|----------|------------------|----------------|
| 1-5         | 1        | Tutorial         | 5-60 minutes   |
| 6-9         | 2        | Multi-artwork    | 20-108 minutes |
| 10-12       | 3        | Commitment       | 45-198 minutes |
| 13-15       | 4        | Expert           | 80-345 minutes |
| 16-18       | 5        | Master           | 140-510 minutes|
| 19-25       | 6        | Legendary        | 245+ minutes   |

## 🧪 Quality Assurance

### Comprehensive Testing
- **18 Test Cases** covering all core functionality
- **Game Logic Validation** for progression calculations
- **Edge Case Handling** for extreme inputs
- **Performance Testing** for responsive user experience

### Code Quality Standards
- **ESLint Configuration** with React-specific rules
- **Modern JavaScript** patterns and best practices
- **Type Safety** through careful validation
- **Memory Management** with proper cleanup

## 🚀 Getting Started

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd pixel-quest

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
node test-runner.js

# Lint code
npm run lint
```

### Development Workflow
1. **Quest Creation**: Add tasks with appropriate difficulty levels
2. **Quest Completion**: Mark tasks complete to earn XP and reveal pixels
3. **Artwork Discovery**: Watch masterpieces emerge as you complete quests
4. **Level Progression**: Advance through increasingly challenging levels
5. **Gallery Building**: Collect completed artworks in your personal gallery

## 📈 User Progression Flow

### Beginner Phase (Levels 1-5)
- Single artwork per level
- Quick completion times (5-60 minutes)
- High pixel reveal rate (20% down to 5% per quest)
- Immediate gratification and habit formation

### Intermediate Phase (Levels 6-12)
- Multiple artworks per level (2-3)
- Moderate time investment (20-198 minutes)
- Balanced challenge and reward
- Strategic planning development

### Expert Phase (Levels 13-18)
- Complex multi-artwork challenges (4-5)
- Significant time commitment (80-510 minutes)
- Elite achievement status
- Advanced productivity mastery

### Master Phase (Levels 19-25)
- Maximum complexity (6 artworks)
- Epic time investment (245+ minutes)
- Legendary status achievement
- Ultimate productivity challenge

## 🎨 Artwork Collection

The application features carefully curated artworks spanning multiple cultures and time periods:

- **Western Masters**: Picasso, Van Gogh, Munch, Kandinsky
- **Indian Masters**: Raja Ravi Varma, Jamini Roy, M.F. Husain, S.H. Raza
- **Modern Movements**: Cubism, Expressionism, Abstract Art
- **Cultural Diversity**: Representing global artistic traditions

## 🛠️ Technical Specifications

### Performance Optimizations
- **Lazy Loading**: Efficient resource management
- **State Batching**: Optimized React re-renders
- **Memory Cleanup**: Proper component unmounting
- **Build Optimization**: Minified production bundles

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **ES6+ Support**: Required for full functionality
- **Local Storage**: Required for progress persistence
- **Canvas Support**: Required for pixel art rendering

### Accessibility Features
- **Keyboard Navigation**: Full application control via keyboard
- **Screen Reader Support**: Semantic HTML structure
- **High Contrast**: Distinguishable UI elements
- **Responsive Design**: Mobile and desktop optimization

## 🔮 Future Enhancements

### Planned Features
- **Custom Artwork Upload**: User-generated content support
- **Social Features**: Progress sharing and competition
- **Achievement System**: Badges and milestone rewards
- **Advanced Analytics**: Detailed progress tracking

### Technical Improvements
- **Backend Integration**: Cloud synchronization
- **Mobile App**: Native iOS and Android versions
- **Advanced Animations**: Enhanced visual feedback
- **Performance Monitoring**: Real-time optimization

## 📝 Contributing

### Development Guidelines
1. Follow existing code patterns and naming conventions
2. Write tests for new functionality
3. Ensure all tests pass before submitting changes
4. Maintain documentation for new features
5. Follow the established commit message format

### Bug Reports
Please include:
- Browser and version information
- Steps to reproduce the issue
- Expected vs actual behavior
- Console error messages (if any)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Art Assets**: Curated collection of public domain and fair use artworks
- **Icon Library**: Lucide React for consistent iconography
- **Testing Framework**: Custom testing suite for reliability
- **Design Inspiration**: Modern productivity and gaming applications

---

**Pixel Quest** - Transform your productivity into art! 🎨✨