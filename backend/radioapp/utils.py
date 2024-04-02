def convertiCapacità(capacità):
    if capacità == 64:
        return "64 GB"
    elif capacità == 128:
        return "128 GB"
    elif capacità == 256:
        return "256 GB"
    elif capacità == 512:
        return "512 GB"
    elif capacità == 1024:
        return "1 TB"
    else:
        return "Capacità non riconosciuta"
