import subprocess as su
import os

print os.getcwd()
print su.check_output(["git", "pull", "origin"])