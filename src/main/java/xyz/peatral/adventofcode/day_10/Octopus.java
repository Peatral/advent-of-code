package xyz.peatral.adventofcode.day_10;

public class Octopus {
    private int energyLevel;
    private boolean flashed;

    public Octopus(int energyLevel) {
        this.energyLevel = energyLevel;
    }

    public int getEnergyLevel() {
        return energyLevel;
    }

    public boolean hasFlashed() {
        return flashed;
    }

    public void incrementEnergy() {
        energyLevel++;
    }

    public void resetFlashed() {
        flashed = false;
    }

    public boolean hasToFlash() {
        return energyLevel > 9;
    }

    public void flash() {
        flashed = true;
        energyLevel = 0;
    }
}
