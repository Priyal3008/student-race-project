// ~40 realistic sample students. Joined dates are relative to "now" (last 7 days).
// Row format: [name, college, branch, referrals, daysAgo, hoursOffset, channel]
const ROWS = [
  ["Riya Deshmukh", "Yeshwantrao Chavan College of Engineering", "CSE", 30, 6, 3, "ambassador"],
  ["Aarav Patil", "GH Raisoni College of Engineering", "IT", 27, 6, 1, "club"],
  ["Sneha Meshram", "Shri Ramdeobaba College of Engineering", "CSE", 24, 5, 9, "ambassador"],
  ["Rohan Thakre", "Priyadarshini College of Engineering", "ECE", 19, 5, 4, "linkedin"],
  ["Pooja Wagh", "KDK College of Engineering", "CSE", 17, 6, 8, "referral"],
  ["Karan Verma", "Yeshwantrao Chavan College of Engineering", "MECH", 15, 4, 6, "club"],
  ["Ishita Joshi", "St. Vincent Pallotti College of Engineering", "IT", 13, 4, 2, "ambassador"],
  ["Mayur Kale", "Rajiv Gandhi College of Engineering", "EEE", 12, 5, 12, "referral"],
  ["Tanmay Raut", "GH Raisoni College of Engineering", "CSE", 11, 3, 7, "linkedin"],
  ["Neha Bhoyar", "Shri Ramdeobaba College of Engineering", "ECE", 10, 4, 10, "club"],
  ["Aditya Gupta", "Jhulelal Institute of Technology", "CIVIL", 9, 3, 5, "referral"],
  ["Sakshi Sharma", "Datta Meghe College of Engineering", "IT", 8, 5, 6, "ambassador"],
  ["Harsh Pandey", "Government College of Engineering, Nagpur", "CSE", 8, 3, 11, "direct"],
  ["Priya Nimje", "Priyadarshini College of Engineering", "CSE", 7, 4, 14, "referral"],
  ["Vikas Dhoke", "KDK College of Engineering", "MECH", 6, 2, 3, "club"],
  ["Isha Kharat", "Anjuman College of Engineering", "ECE", 6, 3, 9, "linkedin"],
  ["Om Chaudhari", "Suryodaya College of Engineering", "CSE", 5, 2, 8, "referral"],
  ["Shruti Lokhande", "Yeshwantrao Chavan College of Engineering", "EEE", 5, 4, 1, "ambassador"],
  ["Yash Borkar", "Nagpur Institute of Technology", "IT", 4, 2, 2, "direct"],
  ["Anjali Gawande", "Tulsiramji Gaikwad-Patil College of Engineering", "CIVIL", 4, 3, 4, "referral"],
  ["Nikhil Bante", "GH Raisoni College of Engineering", "CSE", 3, 1, 6, "club"],
  ["Komal Titarmare", "St. Vincent Pallotti College of Engineering", "ECE", 3, 2, 13, "linkedin"],
  ["Sahil Ingole", "Rajiv Gandhi College of Engineering", "MECH", 3, 1, 9, "direct"],
  ["Divya Mankar", "Shri Ramdeobaba College of Engineering", "IT", 2, 2, 5, "referral"],
  ["Prathamesh Zade", "Jhulelal Institute of Technology", "CSE", 2, 1, 3, "ambassador"],
  ["Mansi Bhagat", "Datta Meghe College of Engineering", "EEE", 2, 3, 12, "club"],
  ["Rahul Wankhede", "Government College of Engineering, Nagpur", "CIVIL", 2, 1, 10, "direct"],
  ["Tanvi Dongre", "Priyadarshini College of Engineering", "CSE", 1, 1, 5, "referral"],
  ["Abhishek Sahu", "KDK College of Engineering", "ECE", 1, 2, 7, "linkedin"],
  ["Payal Ramteke", "Anjuman College of Engineering", "IT", 1, 0, 20, "direct"],
  ["Gaurav Hedau", "Suryodaya College of Engineering", "MECH", 1, 1, 14, "club"],
  ["Rutuja Fulzele", "Yeshwantrao Chavan College of Engineering", "CSE", 0, 0, 16, "ambassador"],
  ["Sumit Tiwari", "Nagpur Institute of Technology", "EEE", 0, 0, 12, "direct"],
  ["Kajal Bawane", "GH Raisoni College of Engineering", "IT", 0, 0, 9, "referral"],
  ["Devesh Mohod", "Shri Ramdeobaba College of Engineering", "CIVIL", 0, 1, 2, "club"],
  ["Ayush Katole", "Rajiv Gandhi College of Engineering", "CSE", 0, 0, 6, "linkedin"],
  ["Nisha Gajbhiye", "St. Vincent Pallotti College of Engineering", "ECE", 0, 0, 4, "referral"],
  ["Pranav Kuhikar", "Jhulelal Institute of Technology", "MECH", 0, 0, 3, "direct"],
  ["Madhuri Sonwane", "Datta Meghe College of Engineering", "CSE", 0, 0, 1, "ambassador"],
];

const CH = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

// Deterministic 6-char code so seed links stay stable between loads.
function codeFor(i) {
  let h = (i + 1) * 2654435761;
  let out = "";
  for (let k = 0; k < 6; k++) {
    h = Math.imul(h ^ (h >>> 13), 1274126177) + k;
    out += CH[(h >>> 0) % CH.length];
  }
  return out;
}

export function getSeed() {
  const now = Date.now();
  return ROWS.map(([name, college, branch, referrals, daysAgo, hrs, channel], i) => ({
    id: "seed-" + (i + 1),
    code: codeFor(i),
    name,
    college,
    branch,
    phone: "90000" + String(10000 + i * 37).slice(0, 5),
    channel,
    baseReferrals: referrals,
    joinedAt: now - daysAgo * 86400000 - hrs * 3600000,
    seed: true,
  }));
}
