import { Step, TemporaryStep } from './interfaces'

export default function log(step: TemporaryStep): void {
    Logger.getInstance().temporarySteps.push(step)
}

export function getLogs(): Step[] {
    return Logger.getInstance().steps
}

export function clearLogs(): void {
    Logger.getInstance().temporarySteps = []
    Logger.getInstance().steps = []
}

export function clearTemporarySteps(result: string): void {
    Logger.getInstance().temporarySteps.forEach(step => {
        Logger.getInstance().steps.push({ ...step, result })
    })

    Logger.getInstance().temporarySteps = []
}

class Logger {
    private static instance: Logger

    temporarySteps: TemporaryStep[] = []
    steps: Step[] = []

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger()
        }

        return Logger.instance
    }
}
