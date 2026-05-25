import { DayPlan, TransportResult } from "./types";
import { getTrek } from "./treks";
import { getAttractions } from "./attractions";
import { getFoodGuide } from "./food";
import { findTrains } from "./trains";

export function generateItinerary(
  source: string,
  destination: string,
  days: number,
  transport: TransportResult
): DayPlan[] {
  const itinerary: DayPlan[] = [];
  const trekInfo = getTrek(destination);
  const isTrek = !!trekInfo;

  // Food recommendations for day plans
  const foodGuide = getFoodGuide(destination);
  const budgetEatery = foodGuide?.budgetEateries?.[0] || { name: "Local Dhaba", specialty: "North Indian Thali" };
  const localDish = foodGuide?.mustEat?.[0]?.dish || "Local cuisine";

  // Case A: Trek Mode Itinerary
  if (isTrek && trekInfo) {
    const trekDays = trekInfo.durationDays;
    
    // Day 1: Travel from Source to Trek Base Camp (e.g. Delhi to Sankri)
    let outboundTransportNotes = "";
    if (transport.type === "direct") {
      const rec = transport.options.find(o => o.recommended) || transport.options[0];
      outboundTransportNotes = `Travel from ${source} to ${destination} via ${rec.mode} (${rec.className}).`;
    } else {
      outboundTransportNotes = `Multi-modal journey: ${transport.route.summary}`;
      if (transport.route.tip) {
        outboundTransportNotes += ` Note: ${transport.route.tip}`;
      }
    }

    itinerary.push({
      day: 1,
      title: `Day 1: Arrival at ${trekInfo.baseCamp} (Trek Base Camp)`,
      activities: [
        { timeSlot: "Morning/Afternoon", activity: "Travel from source to trek base camp", cost: 0, durationHours: 8, notes: outboundTransportNotes },
        { timeSlot: "Evening", activity: "Check into homestay/guesthouse at base camp. Trek briefing and gear check.", cost: 0, durationHours: 2, notes: "Meet your guide and rent any necessary gear (shoes, poles, ponchos)." },
        { timeSlot: "Night", activity: `Dinner at base camp`, cost: 0, durationHours: 1, notes: "Eat light and prepare your daypack for the trek. Early sleep." }
      ]
    });

    // Day 2 to N-1: Trek days (ascent & descent)
    for (let i = 0; i < trekDays; i++) {
      const dayNum = i + 2;
      const dayPlan = trekInfo.dailyBreakdown[i] || {
        day: i + 1,
        title: `Trek Day ${i + 1}`,
        distanceKm: 6,
        elevationStart: 2000,
        elevationEnd: 2600,
        durationHours: 5,
        difficulty: "moderate",
        campsite: "Trail Campsite",
        waterSource: true
      };

      itinerary.push({
        day: dayNum,
        title: `Day ${dayNum}: Trek - ${dayPlan.title}`,
        isTrekDay: true,
        trekDay: dayPlan,
        activities: [
          {
            timeSlot: "Morning",
            activity: `Start trek to ${dayPlan.campsite} (${dayPlan.distanceKm} km)`,
            cost: 0,
            durationHours: dayPlan.durationHours,
            notes: `Ascend from ${dayPlan.elevationStart}m to ${dayPlan.elevationEnd}m. Difficulty: ${dayPlan.difficulty}. Water source: ${dayPlan.waterSource ? "Available" : "Not available - carry extra water"}.`
          },
          {
            timeSlot: "Afternoon",
            activity: "Reach campsite, pitch tents, and lunch",
            cost: 0,
            durationHours: 2,
            notes: `Campsite: ${dayPlan.campsite} (${dayPlan.elevationEnd}m). Rest and perform acclimatization walk.`
          },
          {
            timeSlot: "Evening",
            activity: "Soup, sunset photography, and camp game briefing",
            cost: 0,
            durationHours: 2,
            notes: dayPlan.emergencyExit ? `Emergency exit point: ${dayPlan.emergencyExit}` : "Stay warm as temperature drops."
          }
        ]
      });
    }

    // Add remaining buffer days if the user selected more days than the trek duration
    const currentDay = 2 + trekDays;
    const returnDaysCount = days - currentDay + 1; // how many days left for return journey

    if (returnDaysCount > 1) {
      // We have a buffer/extra sightseeing day at the base camp before returning
      itinerary.push({
        day: currentDay - 1,
        title: `Day ${currentDay - 1}: Rest & Buffer Day at ${trekInfo.baseCamp}`,
        activities: [
          { timeSlot: "Morning", activity: "Late breakfast and rest at guesthouse", cost: 0, durationHours: 2, notes: "Acclimatize or recover from the descent." },
          { timeSlot: "Afternoon", activity: "Explore the local village, interact with locals", cost: 0, durationHours: 3, notes: "Visit wood-carved temples or river streams." },
          { timeSlot: "Evening", activity: "Souvenir shopping and return rented gear", cost: 0, durationHours: 2, notes: "Make sure all rented poles/shoes are returned to the shop." }
        ]
      });
    }

    // Final Day: Detailed Return Journey
    const finalDayNum = days;
    
    // Build return transport notes by reversing legs
    let returnTransportNotes = "";
    if (transport.type === "direct") {
      const rec = transport.options.find(o => o.recommended) || transport.options[0];
      returnTransportNotes = `Board return transport from ${destination} to ${source} via ${rec.mode} (${rec.className}).`;
    } else {
      // Multi-leg reverse
      const reverseLegs = [...transport.route.legs].reverse();
      const legDescriptions = reverseLegs.map(leg => {
        if (leg.mode === "trek") return "";
        let trainInfoStr = "";
        
        if (leg.mode === "train") {
          // Look up return train
          const returnTrains = findTrains(leg.to, leg.from);
          if (returnTrains.length > 0) {
            const rt = returnTrains[0];
            trainInfoStr = ` (Train: ${rt.trainName} ${rt.trainNumber}, Departs: ${rt.departureTime})`;
          }
        }
        
        return `${leg.to} to ${leg.from} via ${leg.mode}${trainInfoStr}`;
      }).filter(Boolean);

      returnTransportNotes = `Return path: ${legDescriptions.join(" + ")}.`;
    }

    itinerary.push({
      day: finalDayNum,
      title: `Day ${finalDayNum}: ${trekInfo.baseCamp} → ${source} (Return Journey)`,
      isReturnDay: true,
      activities: [
        { timeSlot: "Morning", activity: "Checkout from homestay & early breakfast", cost: 0, durationHours: 1, notes: `Enjoy breakfast at ${budgetEatery.name} in the base village.` },
        { timeSlot: "Mid-Morning", activity: "Board return transit to hub city", cost: 0, durationHours: 7, notes: returnTransportNotes },
        { timeSlot: "Evening/Night", activity: `Arrive back at ${source}`, cost: 0, durationHours: 1, notes: "End of budget trek adventure." }
      ]
    });

  } else {
    // B. Standard City/Hill Station Itinerary
    const attractions = getAttractions(destination);
    
    // We group attractions (usually 6) across the sightseeing days
    // Assume Day 1 is travel + light sightseeing, Day N is return, intermediate days are full sightseeing
    const totalSightseeingDays = days - 2;

    // Day 1: Outbound Travel & Check-in
    let outboundTransportNotes = "";
    if (transport.type === "direct") {
      const rec = transport.options.find(o => o.recommended) || transport.options[0];
      outboundTransportNotes = `Travel from ${source} to ${destination} via ${rec.mode} (${rec.className}).`;
    } else {
      outboundTransportNotes = `Travel via multi-leg transit: ${transport.route.summary}`;
    }

    itinerary.push({
      day: 1,
      title: `Day 1: Arrival in ${destination}`,
      activities: [
        { timeSlot: "Morning/Afternoon", activity: `Travel from ${source} to ${destination}`, cost: 0, durationHours: 6, notes: outboundTransportNotes },
        { timeSlot: "Evening", activity: `Check in to hotel & freshen up`, cost: 0, durationHours: 2, notes: "Relax after your journey." },
        { timeSlot: "Night", activity: `Dinner: Taste local ${localDish}`, cost: 150, durationHours: 1.5, notes: `Head to ${budgetEatery.name} or local street food joints.` }
      ]
    });

    // Intermediate Days: Sightseeing
    for (let d = 0; d < totalSightseeingDays; d++) {
      const dayNum = d + 2;
      const attIndexStart = d * 2;
      const att1 = attractions[attIndexStart] || { name: "Local Market & Sightseeing", description: "Stroll around local streets and markets", entryFee: 0, timings: "Open 24 hours", durationHours: 2 };
      const att2 = attractions[attIndexStart + 1] || { name: "City Viewpoint", description: "Scenic views of the surrounding city skyline", entryFee: 0, timings: "6:00 AM - 6:00 PM", durationHours: 2 };

      itinerary.push({
        day: dayNum,
        title: `Day ${dayNum}: Explore ${destination}`,
        activities: [
          { timeSlot: "Morning", activity: `Visit ${att1.name}`, cost: att1.entryFee, durationHours: att1.durationHours, notes: `${att1.description}. Timings: ${att1.timings}.` },
          { timeSlot: "Afternoon", activity: `Lunch & Visit ${att2.name}`, cost: att2.entryFee, durationHours: att2.durationHours, notes: `Enjoy a budget meal, then explore: ${att2.description}. Timings: ${att2.timings}.` },
          { timeSlot: "Evening", activity: "Leisure stroll and shopping in local market", cost: 0, durationHours: 2, notes: "Buy local souvenirs, try local snacks." }
        ]
      });
    }

    // Handle 2-day short trips where Day 2 is also the return day
    if (days === 2) {
      let returnTransportNotes = "";
      if (transport.type === "direct") {
        const rec = transport.options.find(o => o.recommended) || transport.options[0];
        
        let trainInfoStr = "";
        if (rec.mode === "Train") {
          const returnTrains = findTrains(destination, source);
          if (returnTrains.length > 0) {
            const rt = returnTrains[0];
            trainInfoStr = ` (${rt.trainName} ${rt.trainNumber}, Departs: ${rt.departureTime})`;
          }
        }
        
        returnTransportNotes = `Board return ${rec.mode}${trainInfoStr} to ${source}.`;
      } else {
        returnTransportNotes = `Board return transit: ${transport.route.legs.map(l => l.mode).reverse().join(" + ")}`;
      }

      itinerary.push({
        day: 2,
        title: `Day 2: ${destination} Sightseeing & Return to ${source}`,
        isReturnDay: true,
        activities: [
          { timeSlot: "Morning", activity: `Checkout & Visit ${attractions[0]?.name || "Local Temple"}`, cost: attractions[0]?.entryFee || 0, durationHours: 2, notes: "Keep luggage at hotel reception." },
          { timeSlot: "Afternoon", activity: "Lunch and souvenir shopping", cost: 100, durationHours: 2, notes: `Eat at ${budgetEatery.name}.` },
          { timeSlot: "Evening", activity: `Return Journey to ${source}`, cost: 0, durationHours: 6, notes: returnTransportNotes }
        ]
      });
    } else {
      // Day N: Detailed Return Journey for 3+ day trips
      const finalDayNum = days;
      
      let returnTransportNotes = "";
      if (transport.type === "direct") {
        const rec = transport.options.find(o => o.recommended) || transport.options[0];
        
        let trainInfoStr = "";
        if (rec.mode === "Train") {
          const returnTrains = findTrains(destination, source);
          if (returnTrains.length > 0) {
            const rt = returnTrains[0];
            trainInfoStr = ` (${rt.trainName} ${rt.trainNumber}, Departs: ${rt.departureTime})`;
          }
        }
        
        returnTransportNotes = `Board return ${rec.mode}${trainInfoStr} to ${source}.`;
      } else {
        const reverseLegs = [...transport.route.legs].reverse();
        const legDescriptions = reverseLegs.map(leg => `${leg.to} to ${leg.from} via ${leg.mode}`);
        returnTransportNotes = `Return path: ${legDescriptions.join(" + ")}.`;
      }

      itinerary.push({
        day: finalDayNum,
        title: `Day ${finalDayNum}: ${destination} → ${source} (Return Journey)`,
        isReturnDay: true,
        activities: [
          { timeSlot: "Morning", activity: "Checkout from hotel and breakfast", cost: 0, durationHours: 1.5, notes: `Check out by 10:00 AM. Breakfast at hotel or local eatery.` },
          { timeSlot: "Mid-Morning", activity: "Souvenir shopping at local market", cost: 0, durationHours: 2, notes: "Pick up handicrafts, dry fruits, or local sweets." },
          { timeSlot: "Afternoon/Evening", activity: `Board transit back to ${source}`, cost: 0, durationHours: 6, notes: returnTransportNotes }
        ]
      });
    }
  }

  return itinerary;
}
