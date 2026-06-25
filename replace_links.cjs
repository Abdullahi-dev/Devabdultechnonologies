const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/company/AboutPage.tsx',
  'src/pages/solutions/LogisticsPlatforms.tsx',
  'src/pages/solutions/GovernmentSystems.tsx',
  'src/pages/solutions/EducationPlatforms.tsx',
  'src/pages/solutions/HealthcareTechnology.tsx',
  'src/pages/solutions/FintechPlatforms.tsx',
  'src/pages/technology/AICapabilities.tsx',
  'src/pages/technology/TechnologyStack.tsx',
  'src/pages/technology/DevelopmentProcess.tsx',
  'src/pages/technology/CloudInfrastructure.tsx',
  'src/pages/technology/SecurityArchitecture.tsx',
  'src/pages/SolutionsPage.tsx',
  'src/pages/CaseStudiesPage.tsx',
  'src/pages/TechnologyPage.tsx',
  'src/pages/ServicesPage.tsx'
];

const linkRegex = /<Link\s+to="\/#?contact"[^>]*>[\s\S]*?Start a Project[\s\S]*?<\/Link>/g;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    content = content.replace(linkRegex, (match) => {
      modified = true;
      let newMatch = match.replace(/<Link\s+to="\/#?contact"/, '<a href="https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project" target="_blank" rel="noopener noreferrer"');
      newMatch = newMatch.replace(/<\/Link>/, '</a>');
      return newMatch;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
