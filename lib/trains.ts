import { TrainRoute } from "./types";

export const TRAIN_ROUTES: TrainRoute[] = [
  // Delhi to Mumbai
  {
    trainNumber: "12952",
    trainName: "Mumbai Rajdhani Express",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "16:55",
    arrivalTime: "08:35",
    durationHours: 15.6,
    sleeper: 450, // Dummy/Estimated if not run, but useful for pricing
    ac3: 2050,
    ac2: 2860,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=MMCT"
  },
  {
    trainNumber: "12951",
    trainName: "New Delhi Rajdhani Express",
    from: "Mumbai",
    to: "Delhi",
    departureTime: "17:00",
    arrivalTime: "08:30",
    durationHours: 15.5,
    sleeper: 450,
    ac3: 2050,
    ac2: 2860,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=MMCT&dst=NDLS"
  },
  // Delhi to Kolkata
  {
    trainNumber: "12302",
    trainName: "Howrah Rajdhani Express",
    from: "Delhi",
    to: "Kolkata",
    departureTime: "16:50",
    arrivalTime: "09:55",
    durationHours: 17.1,
    sleeper: 500,
    ac3: 2200,
    ac2: 3050,
    daysOfOperation: ["Mon", "Tue", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=HWH"
  },
  {
    trainNumber: "12301",
    trainName: "New Delhi Rajdhani Express",
    from: "Kolkata",
    to: "Delhi",
    departureTime: "16:50",
    arrivalTime: "10:15",
    durationHours: 17.4,
    sleeper: 500,
    ac3: 2200,
    ac2: 3050,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=HWH&dst=NDLS"
  },
  // Delhi to Bangalore
  {
    trainNumber: "22692",
    trainName: "Hazrat Nizamuddin - SBC Rajdhani",
    from: "Delhi",
    to: "Bangalore",
    departureTime: "19:50",
    arrivalTime: "05:20",
    durationHours: 33.5,
    sleeper: 780,
    ac3: 3050,
    ac2: 4350,
    daysOfOperation: ["Mon", "Tue", "Fri", "Sat"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NZM&dst=SBC"
  },
  {
    trainNumber: "22691",
    trainName: "Bangalore - Nizamuddin Rajdhani",
    from: "Bangalore",
    to: "Delhi",
    departureTime: "20:00",
    arrivalTime: "05:55",
    durationHours: 33.9,
    sleeper: 780,
    ac3: 3050,
    ac2: 4350,
    daysOfOperation: ["Mon", "Wed", "Thu", "Sat"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=SBC&dst=NZM"
  },
  // Delhi to Chennai
  {
    trainNumber: "12616",
    trainName: "Grand Trunk Express",
    from: "Delhi",
    to: "Chennai",
    departureTime: "16:10",
    arrivalTime: "06:20",
    durationHours: 38.2,
    sleeper: 810,
    ac3: 2120,
    ac2: 3090,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=MAS"
  },
  {
    trainNumber: "12615",
    trainName: "Grand Trunk Express",
    from: "Chennai",
    to: "Delhi",
    departureTime: "18:50",
    arrivalTime: "06:30",
    durationHours: 35.7,
    sleeper: 810,
    ac3: 2120,
    ac2: 3090,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=MAS&dst=NDLS"
  },
  // Delhi to Jaipur
  {
    trainNumber: "12015",
    trainName: "Ajmer Shatabdi Express",
    from: "Delhi",
    to: "Jaipur",
    departureTime: "06:10",
    arrivalTime: "10:45",
    durationHours: 4.6,
    sleeper: 250, // AC Chair Car is used, mapping to AC3/Sleeper estimates
    ac3: 650,     // CC
    ac2: 950,     // EC
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=JP"
  },
  {
    trainNumber: "12016",
    trainName: "New Delhi Shatabdi Express",
    from: "Jaipur",
    to: "Delhi",
    departureTime: "17:45",
    arrivalTime: "22:30",
    durationHours: 4.8,
    sleeper: 250,
    ac3: 650,
    ac2: 950,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=JP&dst=NDLS"
  },
  // Delhi to Agra
  {
    trainNumber: "12050",
    trainName: "Gatimaan Express",
    from: "Delhi",
    to: "Agra",
    departureTime: "08:10",
    arrivalTime: "09:50",
    durationHours: 1.7,
    sleeper: 150,
    ac3: 395, // Chair car
    ac2: 860, // Executive class
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NZM&dst=AGC"
  },
  {
    trainNumber: "12049",
    trainName: "Gatimaan Express",
    from: "Agra",
    to: "Delhi",
    departureTime: "17:45",
    arrivalTime: "19:30",
    durationHours: 1.8,
    sleeper: 150,
    ac3: 395,
    ac2: 860,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=AGC&dst=NZM"
  },
  // Delhi to Dehradun (For Sankri/Har Ki Dun/Kedarkantha/Mussoorie)
  {
    trainNumber: "12017",
    trainName: "Dehradun Shatabdi Express",
    from: "Delhi",
    to: "Dehradun",
    departureTime: "06:45",
    arrivalTime: "12:50",
    durationHours: 6.1,
    sleeper: 220,
    ac3: 550,
    ac2: 850,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=DDN"
  },
  {
    trainNumber: "12018",
    trainName: "New Delhi Shatabdi Express",
    from: "Dehradun",
    to: "Delhi",
    departureTime: "16:55",
    arrivalTime: "22:50",
    durationHours: 5.9,
    sleeper: 220,
    ac3: 550,
    ac2: 850,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=DDN&dst=NDLS"
  },
  // Dehradun to Delhi (overnight option)
  {
    trainNumber: "12206",
    trainName: "Nanda Devi Express",
    from: "Dehradun",
    to: "Delhi",
    departureTime: "22:50",
    arrivalTime: "05:05",
    durationHours: 6.3,
    sleeper: 240,
    ac3: 650,
    ac2: 950,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=DDN&dst=NDLS"
  },
  {
    trainNumber: "12205",
    trainName: "Nanda Devi Express",
    from: "Delhi",
    to: "Dehradun",
    departureTime: "23:50",
    arrivalTime: "05:40",
    durationHours: 5.8,
    sleeper: 240,
    ac3: 650,
    ac2: 950,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=DDN"
  },
  // Delhi to Kathgodam (For Nainital/Lohajung/Munsyari)
  {
    trainNumber: "12040",
    trainName: "Kathgodam Shatabdi Express",
    from: "Delhi",
    to: "Kathgodam",
    departureTime: "06:20",
    arrivalTime: "11:40",
    durationHours: 5.3,
    sleeper: 200,
    ac3: 510,
    ac2: 780,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=KGM"
  },
  {
    trainNumber: "12039",
    trainName: "New Delhi Shatabdi Express",
    from: "Kathgodam",
    to: "Delhi",
    departureTime: "15:35",
    arrivalTime: "20:50",
    durationHours: 5.3,
    sleeper: 200,
    ac3: 510,
    ac2: 780,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=KGM&dst=NDLS"
  },
  // Delhi to Rishikesh/Haridwar (For Chopta/Badrinath/Kedarnath)
  {
    trainNumber: "12056",
    trainName: "Dehradun Jan Shatabdi",
    from: "Delhi",
    to: "Haridwar",
    departureTime: "15:20",
    arrivalTime: "19:30",
    durationHours: 4.2,
    sleeper: 165,
    ac3: 450,
    ac2: 600,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=HW"
  },
  {
    trainNumber: "12055",
    trainName: "New Delhi Jan Shatabdi",
    from: "Haridwar",
    to: "Delhi",
    departureTime: "06:25",
    arrivalTime: "11:15",
    durationHours: 4.8,
    sleeper: 165,
    ac3: 450,
    ac2: 600,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=HW&dst=NDLS"
  },
  // Delhi to Amritsar
  {
    trainNumber: "12029",
    trainName: "Swarna Shatabdi Express",
    from: "Delhi",
    to: "Amritsar",
    departureTime: "07:20",
    arrivalTime: "13:45",
    durationHours: 6.4,
    sleeper: 250,
    ac3: 650,
    ac2: 900,
    daysOfOperation: ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=ASR"
  },
  {
    trainNumber: "12030",
    trainName: "New Delhi Shatabdi Express",
    from: "Amritsar",
    to: "Delhi",
    departureTime: "16:50",
    arrivalTime: "23:05",
    durationHours: 6.3,
    sleeper: 250,
    ac3: 650,
    ac2: 900,
    daysOfOperation: ["Mon", "Tue", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=ASR&dst=NDLS"
  },
  // Mumbai to Pune
  {
    trainNumber: "12123",
    trainName: "Deccan Queen",
    from: "Mumbai",
    to: "Pune",
    departureTime: "17:10",
    arrivalTime: "20:25",
    durationHours: 3.3,
    sleeper: 120,
    ac3: 350,
    ac2: 500,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=CSMT&dst=PUNE"
  },
  {
    trainNumber: "12124",
    trainName: "Deccan Queen",
    from: "Pune",
    to: "Mumbai",
    departureTime: "07:15",
    arrivalTime: "10:25",
    durationHours: 3.2,
    sleeper: 120,
    ac3: 350,
    ac2: 500,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=PUNE&dst=CSMT"
  },
  // Mumbai to Goa
  {
    trainNumber: "10111",
    trainName: "Konkan Kanya Express",
    from: "Mumbai",
    to: "Goa",
    departureTime: "23:05",
    arrivalTime: "10:45",
    durationHours: 11.7,
    sleeper: 380,
    ac3: 1050,
    ac2: 1520,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=CSMT&dst=MAO"
  },
  {
    trainNumber: "10112",
    trainName: "Konkan Kanya Express",
    from: "Goa",
    to: "Mumbai",
    departureTime: "18:00",
    arrivalTime: "05:40",
    durationHours: 11.7,
    sleeper: 380,
    ac3: 1050,
    ac2: 1520,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=MAO&dst=CSMT"
  },
  // Bangalore to Chennai
  {
    trainNumber: "12640",
    trainName: "Brindavan Express",
    from: "Bangalore",
    to: "Chennai",
    departureTime: "15:10",
    arrivalTime: "21:10",
    durationHours: 6.0,
    sleeper: 185,
    ac3: 490,
    ac2: 650,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=SBC&dst=MAS"
  },
  {
    trainNumber: "12639",
    trainName: "Brindavan Express",
    from: "Chennai",
    to: "Bangalore",
    departureTime: "07:40",
    arrivalTime: "13:40",
    durationHours: 6.0,
    sleeper: 185,
    ac3: 490,
    ac2: 650,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=MAS&dst=SBC"
  },
  // Bangalore to Mysore
  {
    trainNumber: "12614",
    trainName: "Wodeyar Express",
    from: "Bangalore",
    to: "Mysore",
    departureTime: "17:30",
    arrivalTime: "20:00",
    durationHours: 2.5,
    sleeper: 90,
    ac3: 280,
    ac2: 400,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=SBC&dst=MYS"
  },
  {
    trainNumber: "12613",
    trainName: "Wodeyar Express",
    from: "Mysore",
    to: "Bangalore",
    departureTime: "07:30",
    arrivalTime: "10:00",
    durationHours: 2.5,
    sleeper: 90,
    ac3: 280,
    ac2: 400,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=MYS&dst=SBC"
  },
  // Kolkata to NJP (For Darjeeling/Sikkim)
  {
    trainNumber: "12343",
    trainName: "Darjeeling Mail",
    from: "Kolkata",
    to: "Darjeeling", // Actually goes to NJP, let's map to both for routing ease
    departureTime: "22:05",
    arrivalTime: "08:15",
    durationHours: 10.2,
    sleeper: 360,
    ac3: 980,
    ac2: 1390,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=SDAH&dst=NJP"
  },
  {
    trainNumber: "12344",
    trainName: "Darjeeling Mail",
    from: "Darjeeling",
    to: "Kolkata",
    departureTime: "20:00",
    arrivalTime: "06:00",
    durationHours: 10.0,
    sleeper: 360,
    ac3: 980,
    ac2: 1390,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NJP&dst=SDAH"
  },
  // Duplicate for NJP
  {
    trainNumber: "12343",
    trainName: "Darjeeling Mail",
    from: "Kolkata",
    to: "New Jalpaiguri (NJP)",
    departureTime: "22:05",
    arrivalTime: "08:15",
    durationHours: 10.2,
    sleeper: 360,
    ac3: 980,
    ac2: 1390,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=SDAH&dst=NJP"
  },
  {
    trainNumber: "12344",
    trainName: "Darjeeling Mail",
    from: "New Jalpaiguri (NJP)",
    to: "Kolkata",
    departureTime: "20:00",
    arrivalTime: "06:00",
    durationHours: 10.0,
    sleeper: 360,
    ac3: 980,
    ac2: 1390,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NJP&dst=SDAH"
  },
  // Delhi to Pathankot (For Dharamshala/Bir Billing)
  {
    trainNumber: "12241",
    trainName: "Chandigarh - Amritsar SF",
    from: "Delhi",
    to: "Dharamshala", // Destination name maps
    departureTime: "23:00",
    arrivalTime: "07:15",
    durationHours: 8.2,
    sleeper: 320,
    ac3: 880,
    ac2: 1250,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=PTK"
  },
  {
    trainNumber: "12242",
    trainName: "Amritsar - Chandigarh SF",
    from: "Dharamshala",
    to: "Delhi",
    departureTime: "22:30",
    arrivalTime: "06:45",
    durationHours: 8.2,
    sleeper: 320,
    ac3: 880,
    ac2: 1250,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=PTK&dst=NDLS"
  },
  // Delhi to Chandigarh
  {
    trainNumber: "12011",
    trainName: "Kalka Shatabdi Express",
    from: "Delhi",
    to: "Chandigarh",
    departureTime: "07:40",
    arrivalTime: "11:05",
    durationHours: 3.4,
    sleeper: 200,
    ac3: 590,
    ac2: 800,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=CDG"
  },
  {
    trainNumber: "12012",
    trainName: "New Delhi Shatabdi Express",
    from: "Chandigarh",
    to: "Delhi",
    departureTime: "18:23",
    arrivalTime: "21:55",
    durationHours: 3.5,
    sleeper: 200,
    ac3: 590,
    ac2: 800,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=CDG&dst=NDLS"
  },
  // Delhi to Jammu (For Srinagar/Sonamarg)
  {
    trainNumber: "12425",
    trainName: "Jammu Rajdhani Express",
    from: "Delhi",
    to: "Srinagar", // Maps to JAT railhead
    departureTime: "20:40",
    arrivalTime: "05:45",
    durationHours: 9.1,
    sleeper: 380,
    ac3: 1350,
    ac2: 1850,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=JAT"
  },
  {
    trainNumber: "12426",
    trainName: "Jammu Tawi Rajdhani",
    from: "Srinagar",
    to: "Delhi",
    departureTime: "21:25",
    arrivalTime: "05:05",
    durationHours: 7.7,
    sleeper: 380,
    ac3: 1350,
    ac2: 1850,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=JAT&dst=NDLS"
  },
  // Guwahati to Shillong (represented by trains to Guwahati GHY)
  {
    trainNumber: "12424",
    trainName: "New Delhi - Dibrugarh Rajdhani",
    from: "Delhi",
    to: "Guwahati",
    departureTime: "16:20",
    arrivalTime: "20:15",
    durationHours: 27.9,
    sleeper: 750,
    ac3: 2950,
    ac2: 4120,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=NDLS&dst=GHY"
  },
  {
    trainNumber: "12423",
    trainName: "Dibrugarh - New Delhi Rajdhani",
    from: "Guwahati",
    to: "Delhi",
    departureTime: "07:00",
    arrivalTime: "10:30",
    durationHours: 27.5,
    sleeper: 750,
    ac3: 2950,
    ac2: 4120,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=GHY&dst=NDLS"
  },
  // Bangalore to Ooty (via Mettupalayam/Coimbatore)
  {
    trainNumber: "12677",
    trainName: "Ernakulam Intercity Express",
    from: "Bangalore",
    to: "Ooty",
    departureTime: "06:10",
    arrivalTime: "13:05",
    durationHours: 6.9,
    sleeper: 210,
    ac3: 560,
    ac2: 780,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=SBC&dst=CBE"
  },
  {
    trainNumber: "12678",
    trainName: "Bangalore Intercity Express",
    from: "Ooty",
    to: "Bangalore",
    departureTime: "12:50",
    arrivalTime: "19:50",
    durationHours: 7.0,
    sleeper: 210,
    ac3: 560,
    ac2: 780,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=CBE&dst=SBC"
  },
  // Bangalore to Munnar (via Aluva/Ernakulam)
  {
    trainNumber: "12677",
    trainName: "Ernakulam Intercity",
    from: "Bangalore",
    to: "Munnar",
    departureTime: "06:10",
    arrivalTime: "16:55",
    durationHours: 10.7,
    sleeper: 250,
    ac3: 750,
    ac2: 1050,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=SBC&dst=ERS"
  },
  {
    trainNumber: "12678",
    trainName: "Bangalore Intercity",
    from: "Munnar",
    to: "Bangalore",
    departureTime: "09:10",
    arrivalTime: "19:50",
    durationHours: 10.7,
    sleeper: 250,
    ac3: 750,
    ac2: 1050,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=ERS&dst=SBC"
  },
  // Chennai to Madurai
  {
    trainNumber: "12635",
    trainName: "Vaigai Superfast Express",
    from: "Chennai",
    to: "Madurai",
    departureTime: "13:50",
    arrivalTime: "21:20",
    durationHours: 7.5,
    sleeper: 215,
    ac3: 580,
    ac2: 800,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=MS&dst=MDU"
  },
  {
    trainNumber: "12636",
    trainName: "Vaigai Superfast Express",
    from: "Madurai",
    to: "Chennai",
    departureTime: "07:00",
    arrivalTime: "14:30",
    durationHours: 7.5,
    sleeper: 215,
    ac3: 580,
    ac2: 800,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=MDU&dst=MS"
  },
  // Mumbai to Ahmedabad
  {
    trainNumber: "12901",
    trainName: "Gujarat Mail",
    from: "Mumbai",
    to: "Ahmedabad",
    departureTime: "22:05",
    arrivalTime: "05:55",
    durationHours: 7.8,
    sleeper: 260,
    ac3: 710,
    ac2: 990,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=MMCT&dst=ADI"
  },
  {
    trainNumber: "12902",
    trainName: "Gujarat Mail",
    from: "Ahmedabad",
    to: "Mumbai",
    departureTime: "22:50",
    arrivalTime: "06:15",
    durationHours: 7.4,
    sleeper: 260,
    ac3: 710,
    ac2: 990,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=ADI&dst=MMCT"
  },
  // Chennai to Bangalore
  {
    trainNumber: "12607",
    trainName: "Lalbagh Express",
    from: "Chennai",
    to: "Bangalore",
    departureTime: "15:30",
    arrivalTime: "21:35",
    durationHours: 6.1,
    sleeper: 185,
    ac3: 490,
    ac2: 650,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=MAS&dst=SBC"
  },
  {
    trainNumber: "12608",
    trainName: "Lalbagh Express",
    from: "Bangalore",
    to: "Chennai",
    departureTime: "06:20",
    arrivalTime: "12:15",
    durationHours: 5.9,
    sleeper: 185,
    ac3: 490,
    ac2: 650,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=SBC&dst=MAS"
  },
  // Bangalore to Gokarna (via Hubli)
  {
    trainNumber: "16595",
    trainName: "Panchaganga Express",
    from: "Bangalore",
    to: "Gokarna",
    departureTime: "18:50",
    arrivalTime: "08:15",
    durationHours: 13.4,
    sleeper: 350,
    ac3: 950,
    ac2: 1350,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=SBC&dst=GOK"
  },
  {
    trainNumber: "16596",
    trainName: "Panchaganga Express",
    from: "Gokarna",
    to: "Bangalore",
    departureTime: "18:45",
    arrivalTime: "07:15",
    durationHours: 12.5,
    sleeper: 350,
    ac3: 950,
    ac2: 1350,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=GOK&dst=SBC"
  },
  // Mumbai to Gokarna
  {
    trainNumber: "12133",
    trainName: "Mangaluru Express",
    from: "Mumbai",
    to: "Gokarna",
    departureTime: "22:02",
    arrivalTime: "10:50",
    durationHours: 12.8,
    sleeper: 390,
    ac3: 1060,
    ac2: 1540,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=CSMT&dst=GOK"
  },
  {
    trainNumber: "12134",
    trainName: "Mumbai Express",
    from: "Gokarna",
    to: "Mumbai",
    departureTime: "17:05",
    arrivalTime: "04:35",
    durationHours: 11.5,
    sleeper: 390,
    ac3: 1060,
    ac2: 1540,
    daysOfOperation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bookingUrl: "https://www.irctc.co.in/nget/train-search?src=GOK&dst=CSMT"
  }
];

export function findTrains(from: string, to: string): TrainRoute[] {
  const normalize = (name: string) => {
    // Simplify matching for nearby stations
    const n = name.toLowerCase();
    if (n.includes("delhi")) return "delhi";
    if (n.includes("mumbai")) return "mumbai";
    if (n.includes("bangalore") || n.includes("bengaluru")) return "bangalore";
    if (n.includes("chennai")) return "chennai";
    if (n.includes("kolkata") || n.includes("howrah") || n.includes("sealdah")) return "kolkata";
    if (n.includes("jaipur")) return "jaipur";
    if (n.includes("agra")) return "agra";
    if (n.includes("dehradun")) return "dehradun";
    if (n.includes("kathgodam")) return "kathgodam";
    if (n.includes("haridwar")) return "haridwar";
    if (n.includes("amritsar")) return "amritsar";
    if (n.includes("goa")) return "goa";
    if (n.includes("pune")) return "pune";
    if (n.includes("darjeeling")) return "darjeeling";
    if (n.includes("njp") || n.includes("jalpaiguri")) return "darjeeling"; // Map NJP to Darjeeling for route resolver
    if (n.includes("dharamshala")) return "dharamshala";
    if (n.includes("srinagar")) return "srinagar";
    if (n.includes("guwahati")) return "guwahati";
    if (n.includes("shillong")) return "guwahati"; // Map Shillong to Guwahati for route resolver
    if (n.includes("coimbatore") || n.includes("ooty")) return "ooty";
    if (n.includes("ers") || n.includes("aluva") || n.includes("munnar")) return "munnar";
    if (n.includes("madurai")) return "madurai";
    if (n.includes("ahmedabad")) return "ahmedabad";
    if (n.includes("gokarna")) return "gokarna";
    if (n.includes("chandigarh")) return "chandigarh";
    return n;
  };

  const normFrom = normalize(from);
  const normTo = normalize(to);

  return TRAIN_ROUTES.filter(
    (route) => normalize(route.from) === normFrom && normalize(route.to) === normTo
  );
}
