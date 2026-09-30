/** Hero stats pill labels for the shared ClientHub (correct singular/plural). */
export function countLabel(n: number, singular: string, plural: string): string {
  return `${n.toLocaleString("en-US")} ${n === 1 ? singular : plural}`;
}

export function hubStatLabels(locationCount: number, scanCount: number) {
  return {
    locations: countLabel(locationCount, "LOCATION", "LOCATIONS"),
    scans: countLabel(scanCount, "TOTAL SCAN", "TOTAL SCANS"),
  };
}
