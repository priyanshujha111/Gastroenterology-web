/* ============================================================================
 * Faculty: Gastroenterology.
 * CONFIRMED: names only.
 * SAMPLE CONTENT: qualification, focus, bio, qualifications and focusAreas
 * below are illustrative drafts. Verify each doctor's actual credentials
 * and replace before launch.
 *
 * Fields:
 *   id             URL slug → /doctors/:id
 *   name           Display name (confirmed)
 *   qualification  Short credential line shown on the card
 *   focus          Short specialty focus shown on the card
 *   photo          Image URL or null. DoctorCard shows the name only;
 *                  only the profile page (/doctors/:id) still reads this field.
 *   bio            Full profile paragraph(s), array of strings
 *   qualifications Full list for the profile page
 *   focusAreas     Tags for the card and profile page
 * ========================================================================== */

export const doctors = [
  {
    id: 'dr-rojit',
    name: 'Dr. Rojit',
    qualification: 'MBBS, MD (Medicine), DM (Gastroenterology)',
    focus: 'Therapeutic Endoscopy & GI Disorders',
    photo: null,
    bio: [
      'Dr. Rojit is a consultant gastroenterologist with a strong clinical focus on diagnostic and therapeutic endoscopy. He teaches the practical approach to common GI presentations such as acid-peptic disease, GI bleeding and dyspepsia.',
      'At Medical Global Academy he guides learners through case-based discussions, endoscopy fundamentals and evidence-based decision making in everyday gastroenterology practice.',
    ],
    qualifications: [
      'MBBS',
      'MD (General Medicine)',
      'DM (Gastroenterology)',
      'Fellowship in Therapeutic Endoscopy',
    ],
    focusAreas: ['Endoscopy', 'GI Bleeding', 'Acid-Peptic Disease'],
  },
  {
    id: 'dr-sumit',
    name: 'Dr. Sumit',
    qualification: 'MBBS, MD (Medicine), DM (Hepatology)',
    focus: 'Liver Diseases & Hepatology',
    photo: null,
    bio: [
      'Dr. Sumit specialises in hepatology, with particular interest in fatty liver disease, viral hepatitis, cirrhosis and its complications. He emphasises early diagnosis and long-term liver care.',
      'His sessions at Medical Global Academy break down complex liver cases into clear, step-by-step clinical reasoning for postgraduates and practising clinicians.',
    ],
    qualifications: [
      'MBBS',
      'MD (General Medicine)',
      'DM (Hepatology)',
      'Fellowship in Liver Disease Management',
    ],
    focusAreas: ['Hepatology', 'Fatty Liver', 'Cirrhosis', 'Viral Hepatitis'],
  },
  {
    id: 'dr-amit',
    name: 'Dr. Amit',
    qualification: 'MBBS, MD (Medicine), DM (Gastroenterology)',
    focus: 'Inflammatory Bowel Disease & Luminal GI',
    photo: null,
    bio: [
      'Dr. Amit focuses on inflammatory bowel disease, irritable bowel syndrome and other luminal gastrointestinal disorders. He is known for a practical, patient-centred approach to chronic GI conditions.',
      'At Medical Global Academy he covers diagnosis, medical therapy and long-term follow-up strategies for Crohn’s disease and ulcerative colitis.',
    ],
    qualifications: [
      'MBBS',
      'MD (General Medicine)',
      'DM (Gastroenterology)',
      'Advanced Training in IBD Management',
    ],
    focusAreas: ['IBD', 'Crohn’s Disease', 'Ulcerative Colitis', 'IBS'],
  },
  {
    id: 'dr-neeraj',
    name: 'Dr. Neeraj',
    qualification: 'MBBS, MS (Surgery), MCh (Surgical Gastroenterology)',
    focus: 'Pancreatobiliary & GI Surgery',
    photo: null,
    bio: [
      'Dr. Neeraj is a surgical gastroenterologist with expertise in pancreatic, biliary and upper GI conditions. He brings the surgical perspective to the faculty, from patient selection to perioperative care.',
      'His teaching at Medical Global Academy connects medical and surgical gastroenterology so learners understand when and how to refer or operate.',
    ],
    qualifications: [
      'MBBS',
      'MS (General Surgery)',
      'MCh (Surgical Gastroenterology)',
      'Fellowship in Pancreatobiliary Surgery',
    ],
    focusAreas: ['GI Surgery', 'Pancreatitis', 'Gallstone Disease', 'Biliary Disorders'],
  },
]

export const getDoctorById = (id) => doctors.find((d) => d.id === id)