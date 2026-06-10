// import { z } from 'zod'
// function getEnumValues<T extends z.ZodEnum>(enumSchema: T): string[] {
//   return Object.values(enumSchema.enum);
// }
// const Norm = z.number().min(0).max(1);
// console.log(Norm)
// console.log(Norm._def.checks)
// type NormType = z.infer<typeof Norm>;
// const DriveMode = z.enum(['Off', 'Low', 'Mid', 'High']);
// const driveModeSchema = z.object({ driveMode: DriveMode })
// type DriveModeType = z.infer<typeof DriveMode>; // 'Off' | 'Low' | 'Mid' | 'High'
// const driveModeValues = getEnumValues(DriveMode); // ['Off', 'Low', 'Mid', 'High']
// console.log(driveModeValues)
// let selectedDriveMode: DriveModeType = driveModeValues[0];
// console.log(selectedDriveMode)
//
