## Flash Focus: Consume less. Study more. One card at a time.

Upload notes, get flash cards, avoid distractions and ace your exams.

## Inspiration

In today's world, students are constantly distracted by platforms like YouTube, Instagram, and TikTok. The addictive nature of short-form videos makes it tough to stay focused during periods of deep work, e.g., exam periods. As students who have dealt with these struggles ourselves, we decided to create a solution. Our goal is to not only block these distractions but also transform them into chances for learning.

## What it does

Flash Focus is a Chrome extension that:
- Blocks user-specified websites during crucial exam periods
- Uses AI to identify and block websites irrelevant to the student's syllabus
- Converts attempted visits to restricted sites into study sessions
- Presents flashcards based on the student's exam notes when distractions are attempted
- Allows users to create custom flashcards for additional study material
- Displays a countdown to exam date after incorrect answers, reinforcing urgency

## How we built it

Our tech stack includes:
- Frontend: React, TypeScript, Vite, and Tailwind CSS
- Backend: Python, FastAPI
- Database: MongoDB
- AI Integration: Gemini API

We developed the Chrome extension architecture to seamlessly integrate with users' browsing experience. The AI component, powered by Gemini, analyzes students' exam notes to understand their syllabus and make intelligent decisions about website relevance.

## Challenges we ran into

1. Remote Collaboration: As first-time hackathon partners working entirely remotely, we had to meticulously plan our idea and divide tasks effectively.
2. Learning Curve: None of us had prior experience building Chrome extensions, which posed a significant challenge given the time constraints.
3. AI Integration: Implementing the Gemini API to accurately analyze exam notes and make real-time decisions about website relevance was complex.
4. Time Management: Balancing feature development, bug fixing, and project refinement within the 48-hour timeframe was challenging.

## Accomplishments that we're proud of

1. Successful Remote Collaboration: Despite never having worked together before, we created a fully functional product that addresses a real problem.
2. Rapid Learning and Implementation: We quickly learned Chrome extension development and successfully built our first extension.
3. AI-Powered Functionality: We effectively integrated AI to make our extension smart and adaptable to individual students' needs.
4. User-Centric Design: We created an intuitive UI/UX that seamlessly integrates into students' study routines.

## What we learned

1. Chrome Extension Development: We gained hands-on experience in building browser extensions.
2. AI Integration: We learned how to leverage AI APIs to enhance application functionality.
3. Remote Teamwork: We developed skills in effective remote collaboration and task management.
4. Rapid Prototyping: We learned to quickly iterate on ideas and develop a minimum viable product under time constraints.

## What's next for Flash Focus

1. Machine Learning Integration: Implement ML to personalize the flashcard generation based on individual learning patterns.
2. Cross-Browser Support: Extend functionality to other popular browsers like Firefox and Safari.
3. Mobile App Development: Create a companion mobile app to provide a holistic study-focus solution.
4. Gamification: Introduce rewards and progress tracking to further motivate users.
5. Integration with Learning Management Systems: Allow seamless import of course materials from popular LMS platforms.

## Setup

1. Clone this repository
2. Run `yarn` or `npm i` (check your node version >= 16)
3. Run `yarn dev` or `npm run dev`
4. Load Extension in Chrome
    - Open Chrome browser
    - Access `chrome://extensions`
    - Enable Developer mode
    - Click on Load unpacked extension
    - Select the `dist` folder in this project (after dev or build)
5. Go to `chrome://flags/#enable-experimental-web-platform-features`
    - Enable "Experimental Web Platform features"
6. If you want to build for production, run `yarn build` or `npm run build`

## Made with

- React 18
- Vite
- TypeScript
- Tailwind CSS
- ESLint
- Chrome Extension Manifest Version 3